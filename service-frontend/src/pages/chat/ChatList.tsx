import { useEffect, useState } from "react";
import styles from './styles/ChatList.module.css';
import { useNavigate } from "react-router-dom";
import { ChatRoom } from "../../type/chat";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function ChatList() {
    const navi = useNavigate();
    const loginUser = useSelector((state: RootState) => state.user);
    const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Loading 상태를 true로 설정
        setLoading(true);

        axios
            .get("http://localhost:8013/banju/chat/chatRoomList", {
                params: {
                    fromUserNo: loginUser.userNo,  // 로그인한 사용자 ID를 파라미터로 전달
                    toUserNo: loginUser.userNo   // 동일한 ID를 예시로 전달 (서버에서 처리 방식을 확인 필요)
                }
            })
            .then((response) => {
                setChatRoomList(response.data);
                console.log(response.data);
                setError(null);  // 에러를 초기화
            })
            .catch((error) => {
                console.error('채팅방 리스트 조회 실패:', error);
                setError('채팅방 리스트 조회에 실패했습니다.');
            })
            .finally(() => {
                setLoading(false);  // 로딩 완료
            });
    }, [loginUser.userNo]);  // 로그인 사용자 ID가 변경될 때만 호출

    if (loading) {
        return <p>Loading...</p>;
    }

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

            {error ? (
                <p className={styles.error}>{error}</p>
            ) : chatRoomList.length === 0 ? (
                <p className={styles.noneChat}>채팅방이 없습니다.</p>
            ) : (
                chatRoomList.map((chatRoom) => (
                    <div className={styles.chatRoomList} key={chatRoom.chatRoomNo}>
                        <div className={styles.chatStroke} onClick={() => handleClick(chatRoom.chatRoomNo)}>
                            <div className={styles.chatBox}>
                                <img className={styles.picture} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                                <p className={styles.nick}>{chatRoom.toNickName}</p>
                                {/* <p className={styles.message}>새 채팅 0개</p> */}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}
