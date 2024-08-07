import React from 'react';
import styles from './css/Login.module.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navi = useNavigate();

    return (
        <div className={styles.loginPage}>
            <div className={styles.closeButtonFrame}>
                <div className={styles.closeIcon} onClick={() => navi('/')} />
            </div>
            <div className={styles.biglogoFrame}>
                <div className={styles.biglogo} />
            </div>
            <div className={styles.nameFrame}>
                <div className={styles.homeLink}>반주한상</div>
            </div>
            <div className={styles.loginInputContainer}>
                <div className={styles.emailInput}>
                    <div className={styles.emailPlaceholder}>이메일을 입력하세요.</div>
                </div>
                <div className={styles.passwordInput}>
                    <div className={styles.passwordPlaceholder}>비밀번호를 입력하세요.</div>
                </div>
            </div>
            <div className={styles.loginSignupButtonContainer}>
                <div className={styles.loginButton}>
                    <div className={styles.loginText}>로그인</div>
                </div>
                <div className={styles.signupButton} onClick={() => navi('/signup')}>
                    <div className={styles.signupText}>회원가입</div>
                </div>
            </div>
            <div className={styles.idPasswordRecovery}>
                <div className={styles.idRecovery}>
                    <div className={styles.idRecoveryText}>아이디 찾기</div>
                </div>
                <div className={styles.verticalDivider}></div>
                <div className={styles.passwordRecovery}>
                    <div className={styles.passwordRecoveryText}>비밀번호 찾기</div>
                </div>
            </div>
            <div className={styles.kakaoLoginContainer}>
                <div className={styles.easyLoginSignup}>
                    <div className={styles.easyLoginSignupText}>──간편하게 로그인/가입──</div>
                </div>
                <div className={styles.kakaoLoginButton} />
            </div>
        </div>
    );
};

export default LoginPage;
