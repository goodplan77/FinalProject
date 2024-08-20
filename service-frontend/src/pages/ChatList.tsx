import { useEffect } from "react";
import styles from './css/ChatList.module.css';
import { useLocation, useNavigate } from "react-router-dom";

export default function ChatList() {
    const navi = useNavigate();

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };
    return (
        <>
            <div className={styles.mainHeader}>
                <div className={styles.backButton} onClick={() => navi('/')}>
                    <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" />
                </div>
                <p className={styles.projectTitleText}>쪽지함</p>
            </div>


            <div className={styles.chatRoomList}>
                <div className={styles.chatStroke} onClick={() => navi('/chatRoom')}>
                    <div className={styles.chatBox}>
                        <img className={styles.picture} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                        <p className={styles.nick}>닉네임</p>
                        <p className={styles.message}>새 쪽지 2개</p>
                    </div>
                </div>
            </div>
        </>
    )
}