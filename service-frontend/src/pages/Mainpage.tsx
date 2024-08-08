import { useLocation, useNavigate } from 'react-router-dom';
import styles from './css/MainPage.module.css';
import { useEffect } from 'react';
import MainHeader from '../components/MainHeader';

export default function MainPage() {
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
            
            <div className={styles.mainContent}>
                <img className={styles.mainBig} src={`${process.env.PUBLIC_URL}/images/lostDog.png`} alt="dog"  onClick={() => navi('/missingList')} />
                <div className={styles.contentButtons}>
                    <div className={styles.buttonsRow}>
                        <div className={styles.buttons} onClick={() => navi('/boardList')}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>일반 게시판</p>
                        </div>
                        <div className={styles.buttons} onClick={() => navi('/usedList')}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>중고 게시판</p>
                        </div>
                        <div className={styles.buttons} onClick={() => navi('/adoptList')}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>입양 게시판</p>
                        </div>
                        <div className={styles.buttons} onClick={() => navi('/missingList')}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>실종 게시판</p>
                        </div>
                    </div>
                    <div className={styles.buttonsRow}>
                        <div className={styles.buttons}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>강아지 정보</p>
                        </div>
                        <div className={styles.buttons}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>날씨</p>
                        </div>
                        <div className={styles.buttons} onClick={() => navi('/petPlace')}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>펫플레이스</p>
                        </div>
                        <div className={styles.buttons}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>이벤트</p>
                        </div>
                    </div>
                </div>

                <div className={styles.classic}>
                    <div className={styles.classicTitle}>
                        <p className={styles.boardType} onClick={() => navi('/boardList')}>일반 게시판</p>
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

                <div className={styles.used}>
                    <p className={styles.boardType} onClick={() => navi('/usedList')}>중고거래 게시판</p>
                    <div className={styles.usedContent}>
                        <div className={styles.usedImg}></div>
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

                <div className={styles.used}>
                    <p className={styles.boardType} onClick={() => navi('/adoptList')}>입양 게시판</p>
                    <div className={styles.usedContent}>
                        <div className={styles.usedImg}></div>
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

                <div className={styles.used}>
                    <p className={styles.boardType} onClick={() => navi('/missingList')}>실종 게시판</p>
                    <div className={styles.usedContent}>
                        <div className={styles.usedImg}></div>
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
            
        </>
    );
}
