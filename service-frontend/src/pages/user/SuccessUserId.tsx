import { useNavigate } from 'react-router-dom';
import styles from './styles/SuccessUserId.module.css'

export default function SuccessUserId() {
    const navi = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.notice}>
                    회원님의 아이디 찾기가 완료되었습니다.
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.rectangleContent}>seo****@naver.com</div>
                    <div className={styles.rectangleContent}>가입일 : 2024.08.01</div>
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