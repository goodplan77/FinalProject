import { useNavigate } from 'react-router-dom';
import styles from './styles/FindUserPassword.module.css';
import { useState } from 'react';
import { initUser, User } from '../../type/user';
import axios from 'axios';

export default function FindUserPassword() {

    const navi = useNavigate();
    const [user , setUser] = useState<User>(initUser);

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let {name , value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    };

    const handleSubmit = async () => {
        if (!user.userName.trim()) {
            alert('이름을 입력하세요.');
            return;
        }

        if (!user.phone.trim()) {
            alert('전화번호를 입력하세요.');
            return;
        }

        if (!user.email.trim()) {
            alert('이메일을 입력하세요.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8013/banju/user/findUserPwd', user);
            if (response.data>0) {
                navi('/changePassword', { state: { userId: response.data} });
            } else {
                alert('해당 정보를 가진 사용자를 찾을 수 없습니다.');
            }
        } catch (error) {
            alert('비밀번호 찾기 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <div className={styles.container}>
                <label className={styles.label}>
                    이름 <span className={styles.required}>•</span>
                </label>
                <div className={styles.rectangle}>
                    <input
                        className={styles.inputPlaceholder}
                        placeholder="이름을 입력하세요."
                        name = "userName"
                        value={user.userName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input type="radio" name="findPasswordMethod" defaultChecked />
                        전화번호
                    </label>
                    <div className={styles.rectangle}>
                        <input
                            className={styles.inputPlaceholder}
                            placeholder="휴대전화 번호를 입력하세요."
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            maxLength={13}
                        />
                    </div>

                    <label className={styles.radioLabel}>
                        <input type="radio" name="findPasswordMethod" />
                        이메일
                    </label>
                    <div className={styles.rectangle}>
                        <input
                            className={styles.inputPlaceholder}
                            placeholder="이메일을 입력하세요."
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className={styles.notice}>
                    소셜로그인을 통해 가입 및 연동하신 경우 비밀번호가 없습니다.<br />
                    해당 소셜로그인 고객센터를 통해 확인해주세요.
                </div>

                <div className={styles.button}>
                    <span className={styles.buttonText} onClick={handleSubmit}>다 음</span>
                </div>
            </div>
        </>
    )
}