import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from './styles/BoardDetail.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectAllBoard } from "../../features/boardSlice";
import { Board, Comment, initialBoard, initialComment } from "../../type/board";
import useInput from "../../hook/useInput";
import { getCookie } from "../../utils/Cookie";
import BoardHeaderbar from "../../components/BoardHeader";

interface BoardDetailProps {
    setBoardNo: (boardNo: string | undefined) => void;
}

export default function BoardDetail({ setBoardNo }: BoardDetailProps) {

    const { boardNo } = useParams<{ boardNo: string }>();
    const parsedBoardNo = boardNo;

    const navi = useNavigate();

    const [showModal, setShowModal] = useState<number>(0);

    const [report, setReport] = useState("");

    const modalRef = useRef<HTMLDivElement | null>(null);

    const [board, setBoard] = useState<Board>(initialBoard);
    const[boardImgUrl , setBoardImgUrl] = useState<string[]>([]);

    const boards = useSelector((state: RootState) => state.boards);

    const loginUser = useSelector((state: RootState) => state.user);

    const [comment, setComment] = useState('');

    const nick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (loginUser.userNo === 10) {
            alert("로그인 후 이용해주세요");
            return;
        }

        event.stopPropagation(); // 이벤트 전파 중단
        setShowModal(1);
    };

    const handleCloseModal = () => {
        setShowModal(0); // 모달을 닫음
        setReport("");
    };

    useEffect(() => {
        const fetchBoardDetails = async () => {
            try {
                setBoardNo(boardNo);
                // 첫 번째 비동기 요청
                const response = await axios.get(`http://localhost:8013/banju/board/boardDetail/${boardNo}`);
                setBoard(response.data);
                console.log(response.data);
                // 첫 번째 요청이 성공한 후에 두 번째 비동기 요청
                if (response.data.boardCode && response.data.boardNo) {
                    const secondResponse = await axios.get(`http://localhost:8013/banju/api/board/${response.data.boardCode}/${boardNo}`);
                    console.log(secondResponse.data);
                    setBoardImgUrl(secondResponse.data.imageList);
                } else {
                    console.log('게시판 정보를 연결하는데 실패했습니다.');
                }
    
            } catch (error) {
                console.error('게시판 정보를 불러오는데 실패했습니다.:', error);
            }
        };
        fetchBoardDetails(); 
    }, [boardNo, setBoardNo]);
    
    const insertComment = (e: FormEvent) => {
        e.preventDefault();
        if (loginUser.nickName === '') {
            alert("로그인후 이용해주세요.");
            return;
        } else {
            const commentData = {
                userNo: loginUser.userNo,
                bordNo: boardNo,
                content: comment
            }
    
            axios
                .post(`http://localhost:8013/banju/board/boardDetail/${boardNo}`, commentData)
                .then((response) => {
                    console.log(response);
                    console.log(comment);
                    console.log('성공');
                    setComment(''); // 댓글 추가 후 폼 초기화
                })
                .catch((error) => {
                    console.log(error);
                    console.log('실패 ㅋ');
                    console.log('작성한 댓글 = ' + comment);
                });
        }

    }
    
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
                
      const makeChatRoom = (e:React.FormEvent) => {
        e.preventDefault();

        const chatRoom = {
            toUserNo : board.userNo,
            fromUserNo : loginUser.userNo
        }

        axios
            .post(`http://localhost:8013/banju/chat/makeChatRoom`, chatRoom)
            .then((response) => {
                
                console.log(loginUser.userNo + "가 " + board.userNo + "에게 채팅방 생성");
                console.log('성공')
                alert("채팅방을 만들었습니다.")
            })
            .catch((error) => {
                alert("채팅방 생성에 실패했습니다.");
                console.log('요청을 보낸 사람' + loginUser.userNo);
                console.log('요청을 받을 사람' + board.userNo);
                console.log(error);
                console.log('생성 실패');
            })
    }

    return (
        <>
            <div className={styles.detail}>
                <div key={board.boardNo}>
                    <div className={styles.top}>
                        <div className={styles.user}  onClick={nick} >
                            <div className={styles.profileImg}></div>
                            <p className={styles.nick}>닉네임</p>
                        </div>


                        <p className={styles.enrollDate}>{board.enrollDate}</p>
                        <div className={styles.boardCode}>
                            <p>
                                {board.boardCode === 'C' && '일반'
                                    || board.boardCode === 'S' && '중고'
                                    || board.boardCode === 'A' && '입양'
                                    || board.boardCode === 'M' && '실종'}
                            </p>
                        </div>  
                    </div>
                    <div className={styles.text}>
                        <p className={styles.title}>{board.title}</p>
                        <p className={styles.content}>{board.content}</p>
                    </div>

                    {/* 이미지 표시 */}
                    <div className={styles.pictures}>
                        {boardImgUrl.length > 0 ? (
                            boardImgUrl.map((imageUrl, index) => (
                                <img key={index} src={`http://localhost:8013/banju${imageUrl}`} alt={`Image ${index}`} className={styles.image} />
                            ))
                        ) : (<></>)}
                    </div>

                    <div className={styles.likeBox}>
                        <img className={styles.like} src={`${process.env.PUBLIC_URL}/images/like.png`} alt="view" />
                        <p className={styles.likeNo}>9999</p>
                    </div>

                    <div className={styles.commentBox}>
                        <form id="commentEnrollForm">
                            <div className={styles.commentPlus}>
                                <input type="text" className={styles.plusBox} name="content" value={comment} required onChange={(e) => setComment(e.target.value)} />
                                <button className={styles.plusBtn} onClick={insertComment}>추가</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showModal === 1 && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <p>{board.nickName} 님과 대화할 채팅방을 만드시겠습니까?</p>
                        <div className={styles.modalBtns}>
                            <button onClick={makeChatRoom}>예</button>
                            <button onClick={handleCloseModal}>아니요</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )


}
