import { useNavigate } from "react-router-dom";
import styles from './styles/ChatRoom.module.css';

interface ChatRoomNoProps {
    setChatRoomNo: (chatRoomNo: string | undefined) => void;
}

export default function ChatRoom({ setChatRoomNo }: ChatRoomNoProps) {
    const navi = useNavigate();




    return (
        <>
            <div className={styles.mainHeader}>
                <div className={styles.backButton} onClick={() => navi('/chatList')}>
                    <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" />
                </div>
                <p className={styles.projectTitleText}>닉네임</p>
                <img className={styles.picture} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                <img className={styles.mark} src={`${process.env.PUBLIC_URL}/images/ex.png`} alt="icon" />
            </div>

            <div className={styles.chatRoom}>



                <div className={styles.chatPost}>
                    <input className={styles.postBox} type="text" />
                    <div className={styles.postBtn}>
                        <p>전송</p>
                    </div>
                </div>
            </div>


            {/* 콘텐츠 아래 하단네비바 영역입니다 */}
            <div className={styles.mainNavi}>
                <div className={styles.naviHome} onClick={() => navi('/')}>
                    <img className={styles.home} src={`${process.env.PUBLIC_URL}/images/home.png`} alt="home" />
                </div>
                <div className={styles.naviHam}>
                    <img className={styles.ham} src={`${process.env.PUBLIC_URL}/images/ham.png`} alt="ham" />
                </div>
                <div className={styles.naviChat}>
                    <img className={styles.chat} src={`${process.env.PUBLIC_URL}/images/message.png`} alt="chat" onClick={() => navi('/chatList')} />
                </div>
                <div className={styles.naviMy} onClick={() => navi('/mypage')}>
                    <img className={styles.my} src={`${process.env.PUBLIC_URL}/images/myPage.png`} alt="myPage" />
                </div>
            </div>
        </>
    )
}