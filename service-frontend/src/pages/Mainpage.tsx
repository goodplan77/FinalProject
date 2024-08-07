import { useNavigate } from 'react-router-dom';
import './css/MainPage.css';

export default function MainPage() {

    const navi = useNavigate();

    return (
        <>






            {/* 헤더 아래 콘텐츠 영역입니다 */}
            <div className='main-content'>
                <div className='main-big'></div>

                <div className='content-buttons'>
                    <div className='buttons-row'>
                        <div className='buttons' onClick={() => navi('/boardList/detail')}>
                            <img className='search' src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>일반 게시판</p>
                        </div>
                        <div className='buttons'>
                            <img className='search' src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>중고 게시판</p>
                        </div>
                        <div className='buttons'>
                            <img className='search' src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>입양 게시판</p>
                        </div>
                        <div className='buttons'>
                            <img className='search' src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>실종 게시판</p>
                        </div>
                    </div>
                    <div className='buttons-row'>
                        <div className='buttons'>
                            <img className='search' src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>강아지 정보</p>
                        </div>
                        <div className='buttons'>
                            <img className='search' src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>날씨</p>
                        </div>
                        <div className='buttons'>
                            <img className='search' src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>펫플레이스</p>
                        </div>
                        <div className='buttons'>
                            <img className='search' src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="icon" />
                            <p>이벤트</p>
                        </div>
                    </div>
                </div>



                <div className='classic'>
                    <div className='classic-title'>
                        <p className='board-type'>일반 게시판</p>
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

                <div className='used'>
                    <p className='board-type'>중고거래 게시판</p>
                    <div className='used-content'>
                        <div className='used-img'></div>
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

                <div className='used'>
                    <p className='board-type'>입양 게시판</p>
                    <div className='used-content'>
                        <div className='used-img'></div>
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
                <div className='used'>
                    <p className='board-type'>실종 게시판</p>
                    <div className='used-content'>
                        <div className='used-img'></div>
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
















        </>
    )
}