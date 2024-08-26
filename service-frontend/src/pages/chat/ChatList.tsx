import { useEffect, useState } from "react";
import styles from './styles/ChatList.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { ChatRoom } from "../../type/chat";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function ChatList() {
    const navi = useNavigate();

    const loginUser = useSelector((state: RootState) => state.user);

    const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:8013/banju/chat/chatRoomList")
            .then((response) => {
                setChatRoomList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleClick = (chatRoomNo: number) => {
        navi(`/chatRoom/${chatRoomNo}`);
    };

    return (
        <>
            <div className={styles.mainHeader}>
                <div className={styles.backButton} onClick={() => navi('/')}>
                    <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" />
                </div>
                <p className={styles.projectTitleText}>쪽지함</p>
            </div>

            {
                chatRoomList.length == 0 ?
                    (
                        <p className={styles.noneChat}>채팅방이 없습니다.</p>
                    ) : (
                        chatRoomList.map((chatRoom) => {
                            return (
                                <div className={styles.chatRoomList} key={chatRoom.chatRoomNo}>
                                    <div className={styles.chatStroke} onClick={() => handleClick(chatRoom.chatRoomNo)}>
                                        <div className={styles.chatBox}>
                                            <img className={styles.picture} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                                            <p className={styles.nick}>{chatRoom.toNickName}</p>
                                            <p className={styles.message}>새 채팅 0개</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )

            }

        </>
    )
}