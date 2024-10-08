import { useNavigate, useParams } from "react-router-dom";
import styles from './styles/ChatRoom.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import SockJs from 'sockjs-client';
import { Client } from "@stomp/stompjs";
import { Message } from "../../type/chat";
import Messages from "./Messages";
import { User } from "../../type/user";
import ChatHeaderbar from "../../components/ChatHeader";


interface ChatRoomNoProps {
    setChatRoomNo: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function ChatRoom({ setChatRoomNo }: ChatRoomNoProps) {

    // 웹소켓 state
    const loginUser = useSelector((state: RootState) => state.user);
    // 서버 url
    const [webSocket, setWebSocket] = useState<Client>();
    // 파람값
    const { chatRoomNo } = useParams();
    // 채팅 메세지를 저장할 state
    const [content, setContent] = useState('');
    // textarea주솟값을 저장할 ref
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // 현재 접속중인 user 정보
    const user = useSelector((state: RootState) => state.user);
    // 현재 채팅방 메세지 state
    const [chatMessage, setChatMessage] = useState<Message[]>([]);
    // 현재 접속중인 url앞부분
    const url = 'http://localhost:8013/banju';
    // 현재 채팅방의 상대방을 저장할 state
    const [chatRoomUser, setChatRoomUser] = useState<User[]>([]);

    // chat의 마지막 메세지 참조
    const messagesEndRef = useRef<HTMLDivElement | null>(null);


    // 웹소켓 연결
    useEffect(() => {
        // npm i --save @types/sockjs-client
        const createWebSocket = () => new SockJs(url + "/stompServer");
        
        const stompClient = new Client({
            webSocketFactory: createWebSocket,
            reconnectDelay: 10000,
            onConnect: (frame) => {
                console.log(frame);

                // 구독 1 현재 채팅방에 메세지가 발행되는 경우
                stompClient.subscribe(`/chat/chatRoomNo/${chatRoomNo}/message`, (frame) => {
                    console.log(frame.body);
                    const message = JSON.parse(frame.body);
                    setChatMessage((prevState) => {
                        return [...prevState, message];
                    })
                });

                // 구독 2 채팅방의 상대방 닉네임
                stompClient.subscribe(`/chat/chatRoomNo/${chatRoomNo}/newUser`, (frame) => {
                    const user = JSON.parse(frame.body);
                    setChatRoomUser((prevState) => {
                        let filterArr = prevState.filter((u) => u.userNo !== user.userNo);
                        return [...filterArr, user];
                    })
                    console.log('뜨는지 테스트');
                    console.log(frame.body);
                })

                // 1) 참여자 정보 추가
                stompClient.publish({
                    destination: `/chat/chatRoomJoin/${chatRoomNo}/${user.userNo}/newMember`,
                    body: JSON.stringify({ chatRoomNo, userNo: user.userNo })
                });

            }
        });

        stompClient.activate(); // 웹소켓객체 실행하는 구문
        setWebSocket(stompClient);
        console.log("zzzz");
        console.log(chatMessage);
        // 채팅방 메세지 가져오기
        axios.get(`${url}/chat/chatRoom/${chatRoomNo}`)
            .then((res) => {
                console.log(res);
                setChatMessage(res.data);
            })

        // 채팅방 참여자 목록 가져오기
        // axios.get(`${url}/chatRoomJoin/chatRoomNo/${chatRoomNo}`)
        //     .then((res) => {
        //         setChatRoomUser(res.data);
        //     })

        return () => {
            // 컴포넌트 소멸시 웹소켓 해제
            stompClient.deactivate(); // 비활성화
        }
    }, []);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessage]);

    const submitMessage = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();

        }
    }

    const sendMessage = () => {
        const chatMessage = {
            content,
            chatRoomNo,
            userNo: user.userNo
        };

        // 메세지 입력을 안했을 경우

        if(!content){
            alert("메세지를 입력해주세요");

            return;
        }
        // 로그인을 안했을 경우
        if (!user) {
            alert("로그인 후에 이용해주세요");
            return;
        }
        // 웹소켓에 연결중인 경우
        if (!webSocket) {
            alert('웹소켓 연결중입니다.');
            return;
        }
        webSocket
            .publish({ // 메세지 브로커에게 전송
                destination: `/chat/sendMessage/chatRoomNo/${chatRoomNo}`,
                headers: {},
                body: JSON.stringify(chatMessage)
            })
        setContent(''); // 메시지 전송 후 입력 필드 비우기
    }

    return (
        <>
            
            <div className={styles.chatRoom}>
                <div className={styles.messages}>
                    <Messages chatMessages={chatMessage} />

                    {/* 마지막 메시지 위치를 참조하는 div */}
                    <div ref={messagesEndRef}></div>

                </div>

                <div className={styles.chatPost}>
                    <textarea className={styles.postBox}
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        onKeyDown={submitMessage}
                    />
                    <div className={styles.postBtn}>
                        <button onClick={sendMessage}>전송</button>
                    </div>
                </div>
            </div>
        </>
    )
}
