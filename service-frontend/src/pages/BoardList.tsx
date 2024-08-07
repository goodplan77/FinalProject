import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './css/boardList.css';

export default function BoardList() {

    const navi = useNavigate();

    return (
        <>
            <div className='main-header'>
                <div className='back-button'>
                    <img className='back' src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" onClick={() => navi('/')} />
                </div>
                <div className='project-name'>
                    <div className='board-title'> {/* 'project-tilte'에서 'project-title'로 수정 */}
                        <p>게시판</p>
                    </div>
                </div>
                <div className='header-buttons'>
                    <div className='boardList-search'>
                        <img className='search' src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search" />
                    </div>
                </div>
            </div>

            <div className="categorys">
                <div className="cate-classic">
                    <p>일반</p>
                </div>
                <div className="cate-used">
                    <p>중고</p>
                </div>
                <div className="cate-buy">
                    <p>입양</p>
                </div>
                <div className="cate-lost">
                    <p>실종</p>
                </div>
                <div className="cate-line">
                    <p>... </p>
                </div>
            </div>

            <div className='classic'>
                <div className='classic-title'>
                    <div className='classic-contents'>

                        <div className='classic-content'>
                            <div className='img'></div>
                            <div className='upAndDown'>
                                <div className='content-up'>
                                    <div className='content-title'>
                                        <p>글제목글제목</p>
                                    </div>
                                    <div className='up-right'>
                                        <div className='content-info'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                            <p className='view-no'>20</p>
                                        </div>
                                        <p className='content-date'>2024-01-01</p>
                                    </div>
                                </div>

                                <div className='content-down'>
                                    <p className='down-nick'>닉네임닉네임</p>
                                    <div className='down-right'>
                                        <div className='empty-place'></div>
                                        <div className='content-like'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                            <p>20</p>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                            <p>18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='classic-content'>
                            <div className='img'></div>
                            <div className='upAndDown'>
                                <div className='content-up'>
                                    <div className='content-title'>
                                        <p>글제목글제목</p>
                                    </div>
                                    <div className='up-right'>
                                        <div className='content-info'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                            <p className='view-no'>20</p>
                                        </div>
                                        <p className='content-date'>2024-01-01</p>
                                    </div>
                                </div>

                                <div className='content-down'>
                                    <p className='down-nick'>닉네임닉네임</p>
                                    <div className='down-right'>
                                        <div className='empty-place'></div>
                                        <div className='content-like'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                            <p>20</p>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                            <p>18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='classic-content'>
                            <div className='upAndDown'>
                                <div className='content-up'>
                                    <div className='content-title' style={{marginLeft:"10px"}}>
                                        <p>글제목글제목</p>
                                    </div>
                                    <div className='up-right' style={{marginLeft:"80px"}}>
                                        <div className='content-info'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                            <p className='view-no'>20</p>
                                        </div>
                                        <p className='content-date'>2024-01-01</p>
                                    </div>
                                </div>

                                <div className='content-down'  style={{marginLeft:"10px"}}>
                                    <p className='down-nick'>닉네임닉네임</p>
                                    <div className='down-right'  style={{marginLeft:"180px"}}>
                                        <div className='empty-place'></div>
                                        <div className='content-like'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                            <p>20</p>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                            <p>18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='classic-content'>
                            <div className='img'></div>
                            <div className='upAndDown'>
                                <div className='content-up'>
                                    <div className='content-title'>
                                        <p>글제목글제목</p>
                                    </div>
                                    <div className='up-right'>
                                        <div className='content-info'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                            <p className='view-no'>20</p>
                                        </div>
                                        <p className='content-date'>2024-01-01</p>
                                    </div>
                                </div>

                                <div className='content-down'>
                                    <p className='down-nick'>닉네임닉네임</p>
                                    <div className='down-right'>
                                        <div className='empty-place'></div>
                                        <div className='content-like'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                            <p>20</p>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                            <p>18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='classic-content'>
                            <div className='upAndDown'>
                                <div className='content-up'>
                                    <div className='content-title' style={{marginLeft:"10px"}}>
                                        <p>글제목글제목</p>
                                    </div>
                                    <div className='up-right' style={{marginLeft:"80px"}}>
                                        <div className='content-info'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                            <p className='view-no'>20</p>
                                        </div>
                                        <p className='content-date'>2024-01-01</p>
                                    </div>
                                </div>

                                <div className='content-down'  style={{marginLeft:"10px"}}>
                                    <p className='down-nick'>닉네임닉네임</p>
                                    <div className='down-right'  style={{marginLeft:"180px"}}>
                                        <div className='empty-place'></div>
                                        <div className='content-like'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                            <p>20</p>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                            <p>18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='classic-content'>
                            <div className='img'></div>
                            <div className='upAndDown'>
                                <div className='content-up'>
                                    <div className='content-title'>
                                        <p>글제목글제목</p>
                                    </div>
                                    <div className='up-right'>
                                        <div className='content-info'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                            <p className='view-no'>20</p>
                                        </div>
                                        <p className='content-date'>2024-01-01</p>
                                    </div>
                                </div>

                                <div className='content-down'>
                                    <p className='down-nick'>닉네임닉네임</p>
                                    <div className='down-right'>
                                        <div className='empty-place'></div>
                                        <div className='content-like'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                            <p>20</p>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                            <p>18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='classic-content'>
                            <div className='img'></div>
                            <div className='upAndDown'>
                                <div className='content-up'>
                                    <div className='content-title'>
                                        <p>글제목글제목</p>
                                    </div>
                                    <div className='up-right'>
                                        <div className='content-info'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                            <p className='view-no'>20</p>
                                        </div>
                                        <p className='content-date'>2024-01-01</p>
                                    </div>
                                </div>

                                <div className='content-down'>
                                    <p className='down-nick'>닉네임닉네임</p>
                                    <div className='down-right'>
                                        <div className='empty-place'></div>
                                        <div className='content-like'>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                            <p>20</p>
                                            <img className='view' src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                            <p>18</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 콘텐츠 아래 하단네비바 영역입니다 */}
            <div className='main-navi'>
                <div className='navi-home'>
                    <img className='home' src={`${process.env.PUBLIC_URL}/images/home.png`} alt="back" />
                </div>
                <div className='navi-ham'>
                    <img className='ham' src={`${process.env.PUBLIC_URL}/images/ham.png`} alt="back" />
                </div>
                <div className='navi-chat'>
                    <img className='chat' src={`${process.env.PUBLIC_URL}/images/message.png`} alt="back" />
                </div>
                <div className='navi-my' onClick={() => navi('/mypage')}>
                    <img className='my' src={`${process.env.PUBLIC_URL}/images/myPage.png`} alt="back" />
                </div>
            </div>


        </>
    )
}