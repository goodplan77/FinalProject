import { useNavigate, useParams } from 'react-router-dom';
import style from './BoardHeader.module.css';
import { getCookie } from '../utils/Cookie';
import axios from '../utils/CustomAxios';
import { useEffect, useRef, useState } from 'react';
import { Board, initialBoard } from '../type/board';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface BoardHeaderbarProps {
    boardNo: string | undefined;
}

export default function BoardHeaderbar({ boardNo }: BoardHeaderbarProps) {
    const navi = useNavigate();
    const [showModal, setShowModal] = useState<number>(0);
    const [report, setReport] = useState("");
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [selectedOption, setSelectedOption] = useState("");
    const loginUser = useSelector((state: RootState) => state.user);

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

    const handleOpenReport = () => {
        setShowModal(2); // 신고 내용 입력 단계로 이동
    };

    const handleCloseModal = () => {
        setShowModal(0); // 모달을 닫음
        setReport("");
    };

    const handleSubmitReport = () => {

        if (loginUser.userNo === 10) {
            alert("로그인 후 이용해주세요");
            return;
        }

        const reportData = {
            userNo: loginUser.userNo,
            category: selectedOption,
            content: report,
            typeCode: 'B',
            refNo: boardNo
        };

        console.log(reportData);

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
            <div className={style.logo} >
                <img className={style.logoImg} src='/images/logo.png' alt='메인 로고' onClick={test} />
                <h3 onClick={() => navi('/')}>반주 한상</h3>
            </div>
            <div className={style.button}>
                <img className={style.exImg} src='/images/ex.png' alt='신고' onClick={ex} />
            </div>
            {showModal === 1 && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <button onClick={handleOpenReport}>신고하기</button>
                    </div>
                </div>
            )}
            {showModal === 2 && (
                <div className={style.modalOverlayCenter}>
                    <div className={style.modalContentReport}>
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