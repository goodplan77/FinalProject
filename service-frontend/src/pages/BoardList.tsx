import { useNavigate } from 'react-router-dom';
import styles from './css/BoardList.module.css';

export default function BoardList() {
    const navi = useNavigate();

    return (
        <>
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
                <div className={styles.cateClassic}>
                    <p>일반</p>
                </div>
                <div className={styles.cateUsed} onClick={() => navi('/usedList')}>
                    <p>중고</p>
                </div>
                <div className={styles.cateBuy}>
                    <p>입양</p>
                </div>
                <div className={styles.cateLost}>
                    <p>실종</p>
                </div>
                <div className={styles.cateLine}>
                    <p>... </p>
                </div>
            </div>

            <div className={styles.classic}>
                <div className={styles.classicTitle}>
                    <div className={styles.classicContents}>
                        <div className={styles.classicContent}>
                            <div className={styles.img}></div>
                            <div className={styles.upAndDown}>
                                <div className={styles.contentUp}>
                                    <div className={styles.contentTitle}>
                                        <p>글제목글제목</p>
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

                        <div className={styles.classicContent}>
                            <div className={styles.img}></div>
                            <div className={styles.upAndDown}>
                                <div className={styles.contentUp}>
                                    <div className={styles.contentTitle}>
                                        <p>글제목글제목</p>
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

                        <div className={styles.classicContent}>
                            <div className={styles.upAndDown}>
                                <div className={styles.contentUp}>
                                    <div className={`${styles.contentTitle}`} style={{marginLeft:"5px"}}>
                                        <p>글제목글제목</p>
                                    </div>
                                    <div className={`${styles.upRight}`} style={{marginLeft:"100px"}}>
                                        <div className={styles.contentInfo}>
                                            <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                            <p className={styles.viewNo}>20</p>
                                        </div>
                                        <p className={styles.contentDate}>2024-01-01</p>
                                    </div>
                                </div>

                                <div className={styles.contentDown}>
                                    <p className={styles.downNick} style={{marginLeft:"5px"}}>닉네임닉네임</p>
                                    <div className={styles.downRight}>
                                        <div className={styles.emptyPlace}></div>
                                        <div className={styles.contentLike} style={{marginLeft:"90px"}}>
                                            <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                            <p>20</p>
                                            <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                            <p>18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.classicContent}>
                            <div className={styles.img}></div>
                            <div className={styles.upAndDown}>
                                <div className={styles.contentUp}>
                                    <div className={styles.contentTitle}>
                                        <p>글제목글제목</p>
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

                        <div className={styles.classicContent}>
                            <div className={styles.upAndDown}>
                                <div className={styles.contentUp}>
                                    <div className={`${styles.contentTitle}`} style={{marginLeft:"5px"}}>
                                        <p>글제목글제목</p>
                                    </div>
                                    <div className={`${styles.upRight}`} style={{marginLeft:"100px"}}>
                                        <div className={styles.contentInfo}>
                                            <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                            <p className={styles.viewNo}>20</p>
                                        </div>
                                        <p className={styles.contentDate}>2024-01-01</p>
                                    </div>
                                </div>

                                <div className={styles.contentDown}>
                                    <p className={styles.downNick} style={{marginLeft:"5px"}}>닉네임닉네임</p>
                                    <div className={styles.downRight}>
                                        <div className={styles.emptyPlace}></div>
                                        <div className={styles.contentLike} style={{marginLeft:"90px"}}>
                                            <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                            <p>20</p>
                                            <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                            <p>18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.classicContent}>
                            <div className={styles.img}></div>
                            <div className={styles.upAndDown}>
                                <div className={styles.contentUp}>
                                    <div className={styles.contentTitle}>
                                        <p>글제목글제목</p>
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

                        <div className={styles.classicContent}>
                            <div className={styles.img}></div>
                            <div className={styles.upAndDown}>
                                <div className={styles.contentUp}>
                                    <div className={styles.contentTitle}>
                                        <p>글제목글제목</p>
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
            </div>

            <div className={styles.mainNavi}>
                <div className={styles.naviHome}>
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
    );
}
