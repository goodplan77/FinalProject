import { useNavigate } from "react-router-dom";
import styles from './css/InsertBoard.module.css';

export default function InsertBoard() {
    const navi = useNavigate();

    return (
        <>
            <div className={styles.mainHeader}>
                <div className={styles.backButton} onClick={() => navi('/')}>
                    <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" />
                </div>
                <div className={styles.projectName}>
                    <div className={styles.boardTitle}>
                        <p>새 게시글</p>
                    </div>
                </div>
            </div>

            <div className="{styles.insert-board}">
                
            </div>

            <div className={styles.mainNavi}>
                <div className={styles.naviHome} onClick={() => navi('/')}>
                    <img className={styles.home} src={`${process.env.PUBLIC_URL}/images/home.png`} alt="back" />
                </div>
                <div className={styles.naviHam}>
                    <img className={styles.ham} src={`${process.env.PUBLIC_URL}/images/ham.png`} alt="back" />
                </div>
                <div className={styles.naviChat}>
                    <img className={styles.chat} src={`${process.env.PUBLIC_URL}/images/message.png`} alt="back" />
                </div>
                <div className={styles.naviMy} onClick={() => navi('/mypage')}>
                    <img className={styles.my} src={`${process.env.PUBLIC_URL}/images/myPage.png`} alt="back" />
                </div>
            </div>
        </>
    )
}