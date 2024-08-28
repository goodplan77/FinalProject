import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import axios from "axios";
import { selectAllBoard } from "../../features/boardSlice";
import styles from './styles/PostedPage.module.css';


interface LoginUserNoProps {
    setUserNo: React.Dispatch<React.SetStateAction<string | undefined>>;
}


export default function LikedList({ setUserNo }: LoginUserNoProps) {

    const navi = useNavigate();
    const dispatch = useDispatch();
    const boards = useSelector((state: RootState) => state.boards);
    const loginUser = useSelector((state: RootState) => state.user);

    const handleClick = (boardNo: number) => {
        navi(`/boardDetail/${boardNo}`);
    };

    useEffect(() => {
        axios.get(`http://localhost:8013/banju/board/likedList/${loginUser.userNo}`)
            .then((reponse) => {
                console.log(reponse);
                dispatch(selectAllBoard(reponse.data));
            })
            .catch((response) => {
                console.log(response);
            })
    }, [])

    return (
        <>
            {
                boards.map((board) => {
                    return (
                        <div key={board.boardNo}>
                            {/* 보드 카테고리바 아래에 보드 리스트입니다. */}
                            <div className={styles.classic}>
                                <div className={styles.classicContent} onClick={() => handleClick(board.boardNo)}>
                                    <div className={styles.img}></div>
                                    <div className={styles.upAndDown}>
                                        <div className={styles.contentUp}>
                                            <div className={styles.contentTitle}>
                                                <p>{board.title}</p>
                                            </div>
                                            <div className={styles.upRight}>
                                                <div className={styles.contentInfo}>
                                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                                    <p className={styles.viewNo}>{board.views}</p>
                                                </div>
                                                <p className={styles.contentDate}>{board.enrollDate}</p>
                                            </div>
                                        </div>

                                        <div className={styles.contentDown}>
                                            <p className={styles.downNick}>닉네임닉네임</p>
                                            <div className={styles.downRight}>
                                                <div className={styles.emptyPlace}></div>
                                                <div className={styles.contentLike}>
                                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                                    <p>20</p>
                                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                                    <p>18</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })


            }
        </>
    )
}