import { useNavigate } from "react-router-dom";
import styles from './css/InsertBoard.module.css';

export  default function InsertBoard(){
    const navi = useNavigate();

    return (
        <>
            <div className={styles.mainHeader}>
                <div className={styles.backButton} onClick={() => navi('/')}>
                    <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" />
                </div>
                <div className={styles.projectName}>
                    <div className={styles.boardTitle}>
                        <p>게시판</p>
                    </div>
                </div>
                <div className={styles.headerButtons}>
                    <div className={styles.boardListSearch}>
                        <img className={styles.search} src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search" />
                    </div>
                </div>
            </div>
        </>
    )
}