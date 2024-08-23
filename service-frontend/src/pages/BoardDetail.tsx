import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from './css/BoardDetail.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectAllBoard } from "../features/boardSlice";
import { Board, initialBoard } from "../type/board";
import BoardHeaderbar from "../components/BoardHeader";


interface BoardDetailProps {
    setBoardNo: (boardNo: string | undefined) => void;
}

export default function BoardDetail({ setBoardNo }: BoardDetailProps) {

    const { boardNo } = useParams<{ boardNo: string }>();
    const parsedBoardNo = boardNo;

    const navi = useNavigate();

    const [board, setBoard] = useState<Board>(initialBoard);
    const[boardImgUrl , setBoardImgUrl] = useState<string[]>([]);

    const boards = useSelector((state: RootState) => state.boards);

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
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

        const comment = {
            Comment
        }

        axios
            .post(`http://localhost:8013/banju/board/boardDetail/${boardNo}`, Comment)
            .then((response) => {
                console.log(response);
                console.log(Comment);
                console.log('댓글 작성 성공');
            })
            .catch((error) => {
                console.log(error);
                console.log('댓글 작성 실패 ㅋㅋㅋ');
                console.log('작성한 댓글 = ' + Comment);
            })
    };

    return (
        <>
            <div className={styles.detail}>
                <div key={board.boardNo}>
                    <div className={styles.top}>
                        <div className={styles.user} onClick={() => navi('/chatRoom')}>
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
                        ) : (
                            <p>이미지가 없습니다.</p>
                        )}
                    </div>


                    <div className={styles.likeBox}>
                        <img className={styles.like} src={`${process.env.PUBLIC_URL}/images/like.png`} alt="view" />
                        <p className={styles.likeNo}>9999</p>
                    </div>

                    <div className={styles.commentBox}>
                        <form id="commentEnrollForm" onSubmit={insertComment}>
                            <div className={styles.commentPlus}>
                                <input type="text" className={styles.plusBox} name="content"></input>
                                <button type="submit" className={styles.plusBtn}>추가</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )


}
