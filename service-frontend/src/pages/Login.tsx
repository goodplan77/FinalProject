import React from 'react';
import './css/login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navi = useNavigate();


    return (
        <div className="login-page">
            <div className="close-button-frame">
                <div className="close-icon" onClick={() => navi('/')} />
            </div>
            <div className="biglogo-frame">
                <div className="biglogo" />
            </div>
            <div className="name-frame">
                <div className="home-link">반주한상</div>
            </div>
            <div className="login-input-container">
                <div className="email-input">
                    <div className="email-placeholder">이메일을 입력하세요.</div>
                </div>
                <div className="password-input">
                    <div className="password-placeholder">비밀번호를 입력하세요.</div>
                </div>
            </div>
            <div className="login-signup-button-container">
                <div className="login-button">
                    <div className="login-text">로그인</div>
                </div>
                <div className="signup-button">
                    <div className="signup-text">회원가입</div>
                </div>
            </div>
            <div className="id-password-recovery">
                <div className="id-recovery">
                    <div className="id-recovery-text">아이디 찾기</div>
                </div>
                <div className="vertical-divider"></div>
                <div className="password-recovery">
                    <div className="password-recovery-text">비밀번호 찾기</div>
                </div>
            </div>
            <div className="kakao-login-container">
                <div className="easy-login-signup">
                    <div className="easy-login-signup-text">──간편하게 로그인/가입──</div>
                </div>
                <div className="kakao-login-button" />
            </div>
            <div className="navi">
                <div className="home-button">
                    <div className="home-icon" />
                </div>
                <div className="hamburger-button">
                    <div className="hamburger-icon" />
                </div>
                <div className="message-button">
                    <div className="message-icon" />
                </div>
                <div className="login-button-my">
                    <div className="login-icon" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
