import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/SuccessUserId.module.css'

export default function SuccessUserId() {
    
    const navi = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    return (
        <>
            <div className={styles.container}>
                <div className={styles.notice}>
                    회원님의 아이디 찾기가 완료되었습니다.
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.rectangleContent}>{email || '이메일 정보를 확인할 수 없습니다.'}</div>
                </div>
                <div className={styles.button}>
                    <span className={styles.buttonText} onClick={() => navi('/login')}>로 그 인</span>
                </div>
                <div className={styles.button}>
                    <span className={styles.buttonText} onClick={() => navi('/findUserPassword')}>비밀번호 찾기</span>
                </div>
            </div>
        </>
    )
}