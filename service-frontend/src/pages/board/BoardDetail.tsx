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

    const [isLike , setIsLike] = useState(false);

    const modalRef = useRef<HTMLDivElement | null>(null);

    const [board, setBoard] = useState<Board>(initialBoard);
    const [boardImgUrl, setBoardImgUrl] = useState<string[]>([]);

    const boards = useSelector((state: RootState) => state.boards);

    const loginUser = useSelector((state: RootState) => state.user);

    const [comment, setComment] = useState('');

    const nick = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log(loginUser.userNo);
        console.log(board.userNo);

        // 글쓴이와 로그인 유저가 같은경우
        if (loginUser.userNo === board.userNo) {
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
                const response = await axios.get(`http://localhost:8013/banju/board/boardDetail/${boardNo}`, {
                    withCredentials: true  // 쿠키를 포함하여 요청
                });
              
                console.log(response.data);
                setBoard(response.data);
    
                // 병렬로 두 개의 비동기 요청 수행: 좋아요 상태와 이미지 불러오기
                const [secondResponse, thirdResponse] = await Promise.allSettled([
                    axios.get(`http://localhost:8013/banju/user/${loginUser.userNo}/like/${boardNo}`),
                    axios.get(`http://localhost:8013/banju/api/board/${response.data.boardCode}/${boardNo}`)
                ]);
    
                // 좋아요 상태 처리
                if (secondResponse.status === "fulfilled") {
                    if (secondResponse.value.data) {
                        setIsLike(true);
                    } else {
                        setIsLike(false);
                    }
                } else {
                    console.error('좋아요 상태를 불러오는데 실패했습니다:', secondResponse.reason);
                    setIsLike(false); // 기본적으로 좋아요를 누르지 않은 상태로 설정
                }

                // 이미지 불러오기 처리
                if (thirdResponse.status === "fulfilled") {
                    console.log(thirdResponse.value.data);
                    setBoardImgUrl(thirdResponse.value.data.imageList);
                } else {
                    console.error('이미지를 불러오는데 실패했습니다:', thirdResponse.reason);
                    setBoardImgUrl([]); // 이미지가 없는 경우 빈 배열로 설정
                }


            } catch (error) {
                console.error('게시판 정보를 불러오는데 실패했습니다.:', error);
            }
        };
      
        fetchBoardDetails();
    }, [boardNo, setBoardNo]);
    

    const checkLikes = () => {
        if (loginUser.userNo === 10) {
            alert("로그인 후 이용해주세요");
            return;
        }

        if(isLike){
            alert("이미 좋아요한 게시글 입니다.");
            return;
        } else {
            const updateLike = async () => {
                try {
                    setBoard({
                        ...board,
                        likes : (board.likes)+1
                    })

                    const updateSendData = {
                        board : board,
                        likeUser : loginUser.userNo
                    }

                    const updateBoardLike = await axios.post(`http://localhost:8013/banju/board/updateLikeCount` , JSON.stringify(updateSendData) , {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    if(updateBoardLike){
                        console.log(updateBoardLike.data.msg);
                        const updateLikeList = await axios.post(`http://localhost:8013/banju/user/insertLike/board/${loginUser.userNo}` , board)
                        if(updateLikeList){
                            console.log(updateLikeList.data.msg);
                            setIsLike(true);
                        }
                    }
        
                } catch (error) {
                    console.error('게시판 정보를 불러오는데 실패했습니다.:', error);
                }
            };
            updateLike(); 
        }
    }

    const insertComment = (e: FormEvent) => {
        e.preventDefault();
        if (loginUser.nickName === '') {
            alert("로그인후 이용해주세요.");
            return;
        } else {
            const commentData = {
                boardNo,
                userNo: loginUser.userNo,
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

    const checkChatRoom = async (): Promise<number> => {
        const chatRoom :{toUserNo:number; fromUserNo:number}= {
            toUserNo: board.userNo,
            fromUserNo: loginUser.userNo
        };
        
        try {
            const response = await axios.get('http://localhost:8013/banju/chat/checkChatRoom', {
                params :chatRoom
            });
            console.log("채팅방이 있음");
            console.log("zzzz" + response.data);
            return response.data; // true 또는 false 반환한다고 가정
        } catch (error) {
            return 1; // 오류 발생 시 false 반환
        }
    };

    const makeChatRoom = async (e: React.FormEvent) => {
        e.preventDefault();

        // 로그인이 안되어 있는 경우
        if (loginUser.userNo === 10) {
            alert("로그인 후 이용해주세요");
            return;
        }

        const chatRoomExists = await checkChatRoom();
        // 그 사람과 내가 같이 있는 채팅방이 이미 있는 경우
        if(chatRoomExists > 0) {
            alert("채팅방이 이미 있습니다.")
            return;
        }

        const chatRoom = {
            toUserNo: board.userNo,
            fromUserNo: loginUser.userNo
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
                console.log('요청을 보낸 사람 = ' + loginUser.userNo);
                console.log('요청을 받을 사람 = ' + board.userNo);
                console.log(error);
                console.log('생성 실패');
            })
    }

    return (
        <>
            <div className={styles.detail}>
                <div key={board.boardNo}>
                    <div className={styles.top}>
                        <div className={styles.user} onClick={nick} >
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

                    <div className={styles.likeBox} onClick={checkLikes}>
                        {
                            isLike ? 
                            (<img className={styles.like} src={`${process.env.PUBLIC_URL}/images/heart.png`} alt="view" />) 
                            : (<img className={styles.like} src={`${process.env.PUBLIC_URL}/images/emptyheart.png`} alt="view" />)
                        }
                        <p className={styles.likeNo}>{board.likes}</p>
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
