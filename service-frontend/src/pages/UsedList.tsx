import { useLocation, useNavigate } from 'react-router-dom';
import styles from './css/UsedList.module.css';
import { useEffect } from 'react';

export default function UsedList() {
    const navi = useNavigate();

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };
    return (
        <>
            <ScrollToTop />
            <div className={styles.mainHeader}>
                <div className={styles.backButton} onClick={() => navi('/')}>
                    <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" />
                </div>
                <div className={styles.projectName}>
                    <div className={styles.boardTitle}>
                        <p>게시판</p>
                    </div>
                </div>
                <div className={styles.headerButtons}>
                    <div className={styles.boardListSearch}>
                        <img className={styles.search} src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search" />
                    </div>
                </div>
            </div>



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
                                <p>개사료 4kg 급처합니다</p>
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
                                <p>개간식 1박스 팝니다</p>
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
                                <p>강아지 장난감 팔아요</p>
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
                                <p>뽀삐 응가 팔아욧~!!</p>
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










            <div className={styles.mainNavi}>
                <div className={styles.naviHome} onClick={() => navi('/')}>
                    <img className={styles.home} src={`${process.env.PUBLIC_URL}/images/home.png`} alt="back" />
                </div>
                <div className={styles.naviHam}>
                    <img className={styles.ham} src={`${process.env.PUBLIC_URL}/images/ham.png`} alt="back" />
                </div>
                <div className={styles.naviChat}>
                    <img className={styles.chat} src={`${process.env.PUBLIC_URL}/images/message.png`} alt="back" />
                </div>
                <div className={styles.naviMy} onClick={() => navi('/mypage')}>
                    <img className={styles.my} src={`${process.env.PUBLIC_URL}/images/myPage.png`} alt="back" />
                </div>
            </div>
        </>
    )

}