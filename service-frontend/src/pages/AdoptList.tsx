import { useLocation, useNavigate } from "react-router-dom";
import styles from './css/AdoptList.module.css';
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { selectAllBoard } from "../features/boardSlice";

export default function AdoptList() {
    const navi = useNavigate();

    const dispatch = useDispatch();

    const adopts = useSelector((state: RootState) => state.boards);

    useEffect(() => {
        axios.get("http://localhost:8013/banju/board/adoptList")
            .then((response) => {
                console.log(response);
                dispatch(selectAllBoard(response.data));
            }).catch((response) => {
                console.log(response);
            })
    }, [])
    return (
        <>
            <div className={styles.categorys}>
                <div className={styles.cateClassic} onClick={() => navi('/BoardList')}>
                    <p>일반</p>
                </div>
                <div className={styles.cateUsed} onClick={() => navi('/usedList')}>
                    <p>중고</p>
                </div>
                <div className={styles.cateBuy} onClick={() => navi('/adoptList')}>
                    <p>입양</p>
                </div>
                <div className={styles.cateLost} onClick={() => navi('/missingList')}>
                    <p>실종</p>
                </div>
                <div className={styles.cateLine}>
                    <p>... </p>
                </div>
            </div>

            {
                adopts.map((board) => {
                    return (
                        <div key={board.boardNo}>

                            <div className={styles.used}>
                                <div className={styles.usedContent} onClick={() => navi('/BoardDetail/' + board.boardNo)}>
                                    <div className={styles.usedImg}></div>
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




            <div className='plus' style={{
                backgroundColor: "#02CCFE",
                width: "70px",
                height: "70px",
                borderRadius: "35px",
                opacity: "50%",
                position: "fixed",
                bottom: "70px",
                right: "10px",
            }} onClick={() => navi('/insertBoard')}>
                <img className='plus-pen' src={`${process.env.PUBLIC_URL}/images/pen.png`} alt="글쓰기" style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    width: "50px",
                    height: "50px"
                }} />
            </div>



        </>
    )
}