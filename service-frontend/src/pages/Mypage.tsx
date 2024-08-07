import React from 'react';
import './css/Mypage.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();

    return (
        <div className="mypage">

            <div className="my-info">
                <div className="profile-frame">
                    <div className="profile-setting-frame">
                        <div className="profile-picture-frame">
                            <div className="profile-picture" />
                        </div>
                        <div className="nickname-frame">
                            <div className="nickname">내 닉네임</div>
                        </div>
                    </div>
                </div>
                <div className="points-frame">
                    <div className="points-text-frame">
                        <div className="points-text">내 포인트 :</div>
                    </div>
                    <div className="points-value-frame">
                        <div className="points-value">1500 P</div>
                    </div>
                </div>
            </div>

            <div className="additional-info">
                <div className="additional-profile-frame">
                    <div className="additional-profile-setting-frame">
                        <div className="additional-profile-picture-frame">
                            <div className="additional-profile-picture" />
                        </div>
                        <div className="additional-nickname-frame">
                            <div className="additional-nickname">내 반려견 이름</div>
                        </div>
                    </div>
                </div>
                <div className="pet-button">
                    <div className="pet-button-text">나의 반려견</div>
                </div>
            </div>

            <div className="button-container">
                <div className="button-frame1">
                    <div className="button-text1">캘린더</div>
                </div>
                <div className="button-frame2">
                    <div className="button-text2">내가 쓴 글 목록</div>
                </div>
                <div className="button-frame3">
                    <div className="button-text3">좋아요 목록</div>
                </div>
            </div>

            <div className="list-container">
                <div className="list-item">
                    <div className="list-item-text">문의하기</div>
                    <div className="back-icon" />
                </div>
                <div className="horizontal-divider" />
                <div className="list-item">
                    <div className="list-item-text">공지사항</div>
                    <div className="back-icon" />
                </div>
                <div className="horizontal-divider" />
                <div className="list-item">
                    <div className="list-item-text">Q&A</div>
                    <div className="back-icon" />
                </div>
                <div className="horizontal-divider" />
                <div className="list-item">
                    <div className="list-item-text">이용약관</div>
                    <div className="back-icon" />
                </div>
            </div>

            <div className="button-footer">
                <div className="button-edit" onClick={() => navi('/edit')}>
                    <div className="button-edit-text">개인정보 수정</div>
                </div>
                <div className="button-logout" onClick={() => navi('/')}>
                    <div className="button-logout-text">로그아웃</div>
                </div>
                <div className="button-login" onClick={() => navi('/login')}>
                    <div className="button-login-text">로그인</div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
