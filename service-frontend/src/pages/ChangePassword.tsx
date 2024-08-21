import { useNavigate } from 'react-router-dom';
import styles from './css/ChangePassword.module.css';

export default function ChangePassword() {

    const navi = useNavigate();

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
                    />
                </div>

                <div className={styles.rectangle}>
                    <input
                        type="password"
                        className={styles.inputPlaceholder}
                        placeholder="새 비밀번호 다시 입력"
                    />
                </div>

                <button className={styles.button}>
                    <span className={styles.confirmText} onClick={() => navi('/login')}>확인</span>
                </button>
            </div>
        </>
    )
}