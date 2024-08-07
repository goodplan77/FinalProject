import { useNavigate } from 'react-router-dom';
import styles from './css/MainPage.module.css';

export default function MainPage() {
    const navi = useNavigate();

    return (
        <>
            <div className={styles.mainHeader}>
                <div className={styles.backButton}>
                    <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" />
                </div>
                <div className={styles.projectName}>
                    <div className={styles.projectLogo}>
                        <img className={styles.logo} src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
                    </div>
                    <div className={styles.projectTitle}>
                        <p className={styles.projectTitleText}>반주한상</p>
                    </div>
                </div>
                <div className={styles.headerButtons}>
                    <div className={styles.aram}>
                        <img className={styles.aramImg} src={`${process.env.PUBLIC_URL}/images/bell.png`} alt="aram" />
                    </div>
                    <div className={styles.search}>
                        <img className={styles.searchImg} src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search" />
                    </div>
                </div>
            </div>

            {/* 헤더 아래 콘텐츠 영역입니다 */}
            <div className={styles.mainContent}>
                <div className={styles.mainBig}></div>

                <div className={styles.contentButtons}>
                    <div className={styles.buttonsRow}>
                        <div className={styles.buttons} onClick={() => navi('/boardList')}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>일반 게시판</p>
                        </div>
                        <div className={styles.buttons}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>중고 게시판</p>
                        </div>
                        <div className={styles.buttons}>
                            <img className={styles.icon} src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>입양 게시판</p>
                        </div>
                        <div className={styles.buttons}>
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
                        <div className={styles.buttons}>
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
                        <p className={styles.boardType}>일반 게시판</p>
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
                    <p className={styles.boardType}>중고거래 게시판</p>
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
                    <p className={styles.boardType}>입양 게시판</p>
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
                    <p className={styles.boardType}>실종 게시판</p>
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

            {/* 콘텐츠 아래 하단네비바 영역입니다 */}
            <div className={styles.mainNavi}>
                <div className={styles.naviHome}>
                    <img className={styles.home} src={`${process.env.PUBLIC_URL}/images/home.png`} alt="home" />
                </div>
                <div className={styles.naviHam}>
                    <img className={styles.ham} src={`${process.env.PUBLIC_URL}/images/ham.png`} alt="ham" />
                </div>
                <div className={styles.naviChat}>
                    <img className={styles.chat} src={`${process.env.PUBLIC_URL}/images/message.png`} alt="chat" />
                </div>
                <div className={styles.naviMy} onClick={() => navi('/mypage')}>
                    <img className={styles.my} src={`${process.env.PUBLIC_URL}/images/myPage.png`} alt="myPage" />
                </div>
            </div>
        </>
    );
}
