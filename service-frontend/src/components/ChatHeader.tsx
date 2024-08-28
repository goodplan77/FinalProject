import { useNavigate } from 'react-router-dom';
import style from './styles/BoardHeader.module.css';
import { getCookie } from '../utils/Cookie';
import axios from '../utils/CustomAxios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { User } from '../type/user';

interface ChatHeaderbarProps {
    chatRoomNo: string | undefined;
    chatRoomUser?: User[]; // chatRoomUser를 선택적 prop으로 변경
}

export default function ChatHeaderbar({ chatRoomNo, chatRoomUser }: ChatHeaderbarProps) {
    const navi = useNavigate();
    const [showModal, setShowModal] = useState<number>(0);
    const [report, setReport] = useState("");
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [selectedOption, setSelectedOption] = useState("");
    const loginUser = useSelector((state: RootState) => state.user);

    // 현재 로그인한 사용자를 제외한 상대방 찾기
    const opponent = chatRoomUser?.find((user) => user.userNo !== loginUser.userNo);

    // 상대방이 나간 경우 
    const nickname = opponent ? opponent.nickName : "채팅방";

    useEffect(() => {}, [showModal]);

    const test = () => {
        const data = {
            accessToken: getCookie("accessToken")
        }
        axios.post("http://localhost:8013/banju/user/test")
            .then(res => {
                console.log(res);
            });
    };

    const ex = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); // 이벤트 전파 중단
        setShowModal(1);
    };

    const handleOpenReport = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // 이벤트 전파 중단
        setShowModal(2); // 신고 내용 입력 단계로 이동
    };

    const handleCloseChat = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // 이벤트 전파 중단
        axios.post(`http://localhost:8013/banju/closeChat/${chatRoomNo}`)
            .then((response) => {
                console.log(response);
            })
            .catch((response) => {
                console.log(response);
            });

        setShowModal(0);
    };

    const handleCloseModal = () => {
        setShowModal(0); // 모달을 닫음
        setReport(""); // 신고 내용 초기화
    };

    const handleSubmitReport = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // 이벤트 전파 중단

        const reportData = {
            userNo: loginUser.userNo,
            category: selectedOption,
            content: report,
            typeCode: 'C',
            refNo: chatRoomNo
        };

        axios.post(`http://localhost:8013/banju/report/insertReport`, reportData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response);
            });

        handleCloseModal();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleCloseModal();
            }
        };

        if (showModal !== 0) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showModal]);

    return (
        <div className={style.container}>
            <div className={style.back} onClick={() => navi(-1)}>
                <img className={style.backImg} src="/images/back-arrow.png" alt="뒤로가기" />
            </div>
            <div className={style.nick}>
                <h3>{nickname}</h3> {/* 상대방 닉네임 표시 */}
            </div>
            <div className={style.button}>
                <img className={style.exImg} src='/images/ex.png' alt='신고' onClick={ex} />
            </div>
            {showModal === 1 && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent} ref={modalRef}>
                        <button onClick={handleOpenReport}>신고하기</button>
                        <button onClick={handleCloseChat}>채팅방 나가기</button>
                    </div>
                </div>
            )}
            {showModal === 2 && (
                <div className={style.modalOverlayCenter}>
                    <div className={style.modalContentReport} ref={modalRef}>
                        <h4>신고</h4>
                        <select
                            className={style.reportSelect}
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <option value="" disabled>신고 종류를 선택해주세요</option>
                            <option value="욕설">욕설</option>
                            <option value="음란">음란</option>
                            <option value="광고">광고</option>
                            <option value="부적절한 닉네임">부적절한 닉네임</option>
                            <option value="기타">기타</option>
                        </select>
                        <textarea
                            value={report}
                            onChange={(e) => setReport(e.target.value)}
                            placeholder="신고사유를 작성해주세요"
                        />
                        <div className={style.modalButtonGroup}>
                            <button onClick={handleCloseModal}>취소하기</button>
                            <button onClick={handleSubmitReport}>제출하기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
