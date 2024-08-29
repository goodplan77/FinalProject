import { useNavigate } from 'react-router-dom';
import styles from './styles/FindUserId.module.css';
import { useState } from 'react';
import axios from 'axios';
import { initUser, User } from '../../type/user';

export default function SearchUserId() {
    
    const navi = useNavigate();
    const [method, setMethod] = useState('phone');
    const [user , setUser] = useState<User>(initUser);

    const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMethod(event.target.value);
    };

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let {name , value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    const handleSubmit = async () => {
        if (!user.userName.trim()) {
            alert('이름을 입력하세요.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8013/banju/user/findUserId', user);
            if (response.data) {
                navi('/successUserId', { state: { email: response.data} });
            } else {
                alert('해당 정보를 가진 사용자를 찾을 수 없습니다.');
            }
        } catch (error) {
            alert('아이디 찾기 요청 중 오류가 발생했습니다.');
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
                        type="text"
                        className={styles.inputPlaceholder}
                        placeholder="이름을 입력하세요."
                        name = "userName"
                        value={user.userName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.inputInstruction}>
                    아이디를 찾을 방법을 선택해주세요.
                </div>

                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="findIdMethod"
                            value="nickname"
                            checked={method === 'nickname'}
                            onChange={handleMethodChange}
                        />
                        닉네임
                    </label>
                    <div className={styles.rectangle}>
                        <input
                            type="text"
                            className={styles.inputPlaceholder}
                            placeholder="닉네임을 입력하세요."
                            name = "nickName"
                            value={user.nickName}
                            onChange={handleInputChange}
                            disabled={method !== 'nickname'}
                        />
                    </div>

                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="findIdMethod"
                            value="phone"
                            checked={method === 'phone'}
                            onChange={handleMethodChange}
                        />
                        휴대전화
                    </label>
                    <div className={styles.rectangle}>
                        <input
                            type="text"
                            className={styles.inputPlaceholder}
                            placeholder="휴대전화 번호를 입력하세요."
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            disabled={method !== 'phone'}
                        />
                    </div>
                </div>

                <button className={styles.button} onClick={handleSubmit}>
                    <span className={styles.confirmText}>확인</span>
                </button>
            </div>
        </>
    )
}