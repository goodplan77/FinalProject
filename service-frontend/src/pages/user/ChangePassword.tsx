import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/ChangePassword.module.css';
import { useState } from 'react';
import { initUser, User } from '../../type/user';
import axios from 'axios';

export default function ChangePassword() {

    const navi = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {};
    const [user , setUser] = useState<User>({...initUser , userNo : userId});
    const [confirmPwd , setConfirmPwd] = useState<string>('');

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let {name , value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    function handleConfirmPwdChange(e: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPwd(e.target.value);
    }

    const handleSubmit = async () => {
        if (user.pwd !== confirmPwd) {
            alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8013/banju/user/changePassword', {
                userNo: user.userNo,
                pwd: user.pwd,
            });
            if (response.data>0) {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                navi('/login');
            } else {
                alert('비밀번호 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('비밀번호 변경 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.instruction}>
                    영문/숫자/특수문자 혼합 8~20자
                </div>

                <div className={styles.rectangle}>
                    <input
                        type="password"
                        className={styles.inputPlaceholder}
                        placeholder="새 비밀번호 입력"
                        name="pwd"
                        value={user.pwd}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.rectangle}>
                    <input
                        type="password"
                        className={styles.inputPlaceholder}
                        placeholder="새 비밀번호 다시 입력"
                        value={confirmPwd}
                        onChange={handleConfirmPwdChange}
                    />
                </div>

                <button className={styles.button}>
                    <span className={styles.confirmText} onClick={handleSubmit}>확인</span>
                </button>
            </div>
        </>
    )
}