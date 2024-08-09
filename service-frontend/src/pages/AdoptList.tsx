import { useLocation, useNavigate } from "react-router-dom";
import styles from './css/AdoptList.module.css';
import { useEffect } from "react";
import axios from "axios";

export default function AdoptList() {
    const navi = useNavigate();

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };

    useEffect(()=>{
        axios.get("http://localhost:8013/banju/board/adoptList")
        .then((response) =>{
            console.log(response);
        })
      },[])
    return (
        <>
            <ScrollToTop />



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



            <div className={styles.used}>
                <div className={styles.usedContent}>
                    <div className={styles.usedImg}></div>
                    <div className={styles.upAndDown}>
                        <div className={styles.contentUp}>
                            <div className={styles.contentTitle}>
                                <p>새끼강아지 입양</p>
                            </div>
                            <div className={styles.upRight}>
                                <div className={styles.contentInfo}>
                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                    <p className={styles.viewNo}>20</p>
                                </div>
                                <p className={styles.contentDate}>2024-01-01</p>
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
                <div className={styles.usedContent}>
                    <div className={styles.usedImg}></div>
                    <div className={styles.upAndDown}>
                        <div className={styles.contentUp}>
                            <div className={styles.contentTitle}>
                                <p>유기견 뽀삐 입양</p>
                            </div>
                            <div className={styles.upRight}>
                                <div className={styles.contentInfo}>
                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                    <p className={styles.viewNo}>20</p>
                                </div>
                                <p className={styles.contentDate}>2024-01-01</p>
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
                <div className={styles.usedContent}>
                    <div className={styles.usedImg}></div>
                    <div className={styles.upAndDown}>
                        <div className={styles.contentUp}>
                            <div className={styles.contentTitle}>
                                <p>시베리안 말티즈 입양</p>
                            </div>
                            <div className={styles.upRight}>
                                <div className={styles.contentInfo}>
                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                    <p className={styles.viewNo}>20</p>
                                </div>
                                <p className={styles.contentDate}>2024-01-01</p>
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
                <div className={styles.usedContent}>
                    <div className={styles.usedImg}></div>
                    <div className={styles.upAndDown}>
                        <div className={styles.contentUp}>
                            <div className={styles.contentTitle}>
                                <p>고양이 입양</p>
                            </div>
                            <div className={styles.upRight}>
                                <div className={styles.contentInfo}>
                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                    <p className={styles.viewNo}>20</p>
                                </div>
                                <p className={styles.contentDate}>2024-01-01</p>
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
                        marginLeft: "9px",
                        width: "50px",
                        height: "50px",
                    }} />
                </div>
            </div>


        </>
    )
}