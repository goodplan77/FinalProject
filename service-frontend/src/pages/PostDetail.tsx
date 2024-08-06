import React from 'react';
import './css/PostDetail.css';

const PostDetail = () => {
    return (
        <div className="post-detail">
            <div className="header-space">
                <div className="back-button">
                    <img src={`${process.env.PUBLIC_URL}/images/뒤로가기2.png`} alt="뒤로가기" className="back-icon" />
                </div>
                <div className="header-container">
                    <div className="text-container">
                        <span className="board-type">일반/사진 게시판</span>
                    </div>
                    <div className="button-frame">
                        <div className="notification">
                            <img src={`${process.env.PUBLIC_URL}/images/alert.png`} alt="알림" className="alert-icon" />
                        </div>
                        <div className="search-button">
                            <img src={`${process.env.PUBLIC_URL}/images/search.png`} alt="검색" className="search-icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-frame">
                <div className="post-info-frame">
                    <div className="profile-nickname">
                        <div className="profile-picture"></div>
                        <div className="nickname">사람들 닉네임 들어가는 곳</div>
                    </div>
                    <div className="post-meta">
                        <div className="post-date">2099.99.99</div>
                        <div className="view-frame">
                            <div className="view-icon">
                                <img src={`${process.env.PUBLIC_URL}/images/eye.png`} alt="조회수" />
                            </div>
                            <div className="view-count">18</div>
                        </div>
                    </div>
                </div>
                <div className="post-title-frame">
                    <span className="post-title">글 제목들 아무렇게나 짓는다</span>
                </div>
                <div className="post-content-frame">
                    <div className="post-content">
                        <p>국가는 법률이 정하는 바에 의하여 재외국민을 보호할 의무를 진다. 국가는 여자의 복지와 권익의 향상을 위하여 노력하여야 한다. 교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다. 그리고 이건 한글입숨에서 가져왔다.</p>
                    </div>
                    <div className="post-images">
                        <div className="image-frame"></div>
                        <div className="image-frame"></div>
                    </div>
                    <div className="like-frame">
                        <div className="like-icon">
                            <img src={`${process.env.PUBLIC_URL}/images/like.png`} alt="좋아요" />
                        </div>
                        <div className="like-count">9999</div>
                    </div>
                </div>
                <div className="comments-frame">
                    <div className="comment-frame">
                        <div className="comment-header-frame">
                            <div className="comment-nickname-frame">
                                <div className="comment-profile-picture"></div>
                                <div className="comment-nickname">내 닉네임</div>
                            </div>
                            <div className="comment-date-frame">
                                <div className="comment-date">2020.01.01</div>
                            </div>
                        </div>
                        <div className="comment-content-frame">
                            <p className="comment-content">댓글 내용 댓글 내용 댓글 내용 댓글 내용 내용 내용 댓글 댓글 댓글 댓글</p>
                            <div className="button-frame">
                                <div className="edit-button">수정</div>
                                <div className="delete-button">삭제</div>
                            </div>
                        </div>
                    </div>
                    {/* 대댓글 프레임도 비슷하게 작성 */}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
