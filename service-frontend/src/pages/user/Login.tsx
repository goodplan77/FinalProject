import React, { ChangeEvent, useState } from 'react';
import styles from './styles/Login.module.css';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import { LoginResponse } from '../../type/signup';
import axios from '../../utils/CustomAxios';
import { setCookie } from '../../utils/Cookie';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';

const LoginPage = () => {

    const [user, setUser] = useState({
        email: '',
        pwd: '',
    });
    const setUserChange = (e: ChangeEvent) => {
        let { name, value } = e.target as HTMLInputElement;
        setUser({
            ...user,
            [name]: value
        });
    }
    const kakaoJavascriptKey = process.env.REACT_APP_KAKAO_API_KEY as string;
    const navi = useNavigate();
    const dispatch = useDispatch();

    // 카카오 로그인 메서드
    const kakaoOnSucess = (data: { response: LoginResponse }) => {

        const ACCESS_TOKEN = data.response.access_token;

        axios
            .post("http://localhost:8013/banju/user/login/kakao", {
                accessToken: ACCESS_TOKEN
            })
            .then(res => {
                const JwtToken = res.data.jwtToken;
                const msg = res.data.msg;

                setCookie("accessToken", JwtToken);
                setCookie("user", res.data.user);
                setUser(res.data.user);

                dispatch(loginUser(res.data.user));

                console.log(res.data.user);

                alert(msg);
                navi('/');
            }).catch((err) => {
                const msg = err.response.data.msg;
                console.log(msg);
            })
    }

    const kakaoOnFail = (error: any) => {
        console.log(error);
        alert('에러...');
    }

    // 일반 로그인 메서드
    const login = () => {
        axios.post("http://localhost:8013/banju/user/login/none", user)
            .then(res => {
                const msg = res.data.msg
                const jwtToken = res.data.jwtToken;
                alert(msg);
                setCookie("accessToken", jwtToken);
                setCookie("user", res.data.user);

                dispatch(loginUser(res.data.user));

                console.log(res.data.user);

                navi('/');
            })
            .catch(err => {
                console.log(err)

                alert("에러");

                // const msg = err.response.data.msg

                // alert(msg);
            })
    }

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
                    <input
                        type="text"
                        id='email'
                        name='email'
                        placeholder='이메일을 입력하세요.'
                        value={user.email}
                        onChange={setUserChange}
                    />
                </div>
                <div className={styles.passwordInput}>
                    <div className={styles.passwordPlaceholder}>비밀번호를 입력하세요.</div>
                    <input
                        type="password"
                        id='pwd'
                        name='pwd'
                        placeholder='비밀번호를을 입력하세요.'
                        value={user.pwd}
                        onChange={setUserChange}
                    />
                </div>
            </div>
            <div className={styles.loginSignupButtonContainer}>
                <div className={styles.loginButton}>
                    <div className={styles.loginText} onClick={login}>로그인</div>
                </div>
                <div className={styles.signupButton} onClick={() => navi('/clause')}>
                    <div className={styles.signupText}>회원가입</div>
                </div>
            </div>
            <div className={styles.idPasswordRecovery}>
                <div className={styles.idRecovery}>
                    <div className={styles.idRecoveryText} onClick={() => navi('/findUserId')}>아이디 찾기</div>
                </div>
                <div className={styles.verticalDivider}></div>
                <div className={styles.passwordRecovery}>
                    <div className={styles.passwordRecoveryText} onClick={() => navi('/findUserPassword')}>비밀번호 찾기</div>
                </div>
            </div>

            <KakaoLogin
                token={kakaoJavascriptKey}
                onSuccess={kakaoOnSucess}
                onFail={kakaoOnFail}
            />

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
