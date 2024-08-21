import { useLocation, useNavigate } from 'react-router-dom';
import styles from './css/BoardList.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectAllBoard } from '../features/boardSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function BoardList() {
    const navi = useNavigate();

    const dispatch = useDispatch();

    const boards = useSelector((state: RootState) => state.boards);

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };

    useEffect(() => {
        axios.get("http://localhost:8013/banju/board/boardList")
            .then((response) => {
                console.log(response);
                dispatch(selectAllBoard(response.data));
            }).catch((response) => {
                console.log(response);
            })
    }, [])
    return (
        <>
            <ScrollToTop />{/* 페이지 이동시 상단이 보이게끔 */}

            {/* 헤더아래에 보드 카테고리 바 입니다. */}
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
                boards.map((board) => {
                    return (
                        <div key={board.boardNo}>
                            {/* 보드 카테고리바 아래에 보드 리스트입니다. */}
                            <div className={styles.classic}>
                                <div className={styles.classicContent}>
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

            
            {/* isnertBoard 페이지로 이동하는 버튼(fixed) */}
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
                    marginTop: "9px",
                    marginLeft: "2px",
                    width: "50px",
                    height: "50px",
                }} />
            </div>
        </>
    );
}
