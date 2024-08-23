import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from './css/BoardDetail.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectAllBoard } from "../features/boardSlice";
import { Board, Comment, initialBoard, initialComment } from "../type/board";
import useInput from "../hook/useInput";

export default function BoardDetail() {

    const navi = useNavigate();

    const [board, setBoard] = useState<Board>(initialBoard);

    const { boardNo } = useParams();

    const boards = useSelector((state: RootState) => state.boards);

    const loginUser = useSelector((state:RootState)=>state.user);

    const [comment, setComment] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:8013/banju/board/boardDetail/${boardNo}`)
            .then((response) => {
                setBoard(response.data);
                console.log(response.data);
                console.log(loginUser);
            }).catch((response) => {
                console.log(response);
            })
    }, [boardNo])

    const insertComment = (e: React.FormEvent) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        console.log(loginUser);
        if(loginUser.nickName === ''){
            alert("로그인후 이용해주세요.");
            return;
        }

        const commentData = {
            userNo : loginUser.userNo,
            bordNo:boardNo,
            content:comment
        }

        axios
        .post(`http://localhost:8013/banju/board/boardDetail/${boardNo}`, commentData)
        .then((response) => {
            console.log(response);
            console.log(comment);
            console.log('성공');
            // 댓글 등록 후 폼 초기화 및 다른 처리
        })
        .catch((error) => {
            console.log(error);
            console.log('실패 ㅋ');
            console.log('작성한 댓글 = ' + comment);
        });



    }



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
                        {(Array.isArray(board.boardImg) && board.boardImg.length > 0) ? (
                            board.boardImg.map((imageUrl, index) => (
                                <img key={imageUrl.imgNo} src={`http://localhost:8013/banju/images/board/${board.boardCode}/${imageUrl.originName}`} alt={`Image ${index}`} className={styles.image} />
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
                                <input type="text" className={styles.plusBox} name="content" value={comment} required onChange={(e)=>setComment(e.target.value)}/>
                                <button  className={styles.plusBtn} onClick={insertComment}>추가</button>
                            </div>
                        </form>



                    </div>

                </div>
            </div>


        </>
    )


}
