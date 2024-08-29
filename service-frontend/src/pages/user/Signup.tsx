import React, { useState, ChangeEvent, CompositionEvent, KeyboardEvent, CompositionEventHandler, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import styles from './styles/Signup.module.css';
import useInput from '../../hook/useInput';
import { Code, initCode } from '../../type/signup';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/Cookie';
import { initUser, User } from '../../type/user';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';

Modal.setAppElement('#root'); // 모달의 접근성 설정

const SignUpPage: React.FC = () => {

    const navi = useNavigate();
    const dispatch = useDispatch();

    const inputElement = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<User>(initUser);
    const [modal, setModal] = useState(false);
    const [code, setCode] = useInput<Code>(initCode);
    const [address, setAddress] = useState({
        postCode: '',
        mainAddress: '',
        detailAddress: ''
    });
    const [signup, setSignup] = useState({
        email: false,
        verification: false,
        nickName: false,
        pwd: false,
        pwdCheck: false
    });
    const [pwdCheck, setPwdCheck] = useState('');

    const setUserChange = (e: ChangeEvent) => {
        let { name, value } = e.target as HTMLInputElement;

        setUser({
            ...user,
            [name]: value
        });
    }

    // 이메일 중복체크 & 발송
    const sendEmail = () => {
        console.log(inputElement.current)

        // 이메일 중복 체크 메서드
        axios.post("http://localhost:8013/banju/user/sendEmail", {
            email: user.email
        })
            .then(res => {
                const msg = res.data.msg;
                const verificationCode = res.data.verificationCode;

                alert(msg);

                setSignup({
                    ...signup,
                    email: true
                });

                if (inputElement.current) {
                    inputElement.current.readOnly = true;
                    inputElement.current.style.backgroundColor = 'lightgray';
                }

                setCookie("verificationCode", verificationCode);
            })
            .catch(error => {
                const msg = error.response.data.msg;
                alert(msg);
                if (inputElement.current) {
                    inputElement.current.readOnly = false;
                    inputElement.current.style.backgroundColor = 'white';
                }
            })
    }

    // 인증코드 확인 메서드
    const checkCode = () => {

        const userCode = getCookie("verificationCode");

        if (code.verificationCode == userCode) {
            alert("인증번호가 확인되었습니다.");
            setSignup({
                ...signup,
                verification: true
            });
        } else {
            alert("인증번호가 다릅니다.");
            setSignup({
                ...signup,
                verification: false
            })
        }
    }

    // 닉네임 중복체크
    const checkNickName = () => {
        if (user.nickName.length < 2 || user.nickName.length > 10) {
            alert("닉네임은 2~10자로 입력해주세요.");
            return;
        }
        axios({
            method: 'get',
            url: "http://localhost:8013/banju/user/checkNickName",
            params: {
                nickName: user.nickName
            }
        }).then(res => {
            alert(res.data.msg);
            setSignup({
                ...signup,
                nickName: true
            });
        }).catch(err => {
            alert(err.response.data.msg);
        })
    }

    // 비밀번호 유효성 검사
    const pwdVerify = (e: ChangeEvent) => {
        let target = e.target as HTMLInputElement;
        let pwd = target.value;
        console.log(pwd);

        setUser({
            ...user,
            pwd: pwd
        })

        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

        if (re.test(pwd)) {
            setSignup({
                ...signup,
                pwd: true
            })
        } else {
            setSignup({
                ...signup,
                pwd: false
            })
        }
    }

    // 비밀번호 일치 확인 메서드
    const pwdCheckFnc = (e: ChangeEvent) => {
        let target = e.target as HTMLInputElement;
        let pwdCheck = target.value;

        setPwdCheck(pwdCheck);

        if (pwdCheck == user.pwd) {
            setSignup({
                ...signup,
                pwdCheck: true
            })
        } else if (pwdCheck != user.pwd) {
            setSignup({
                ...signup,
                pwdCheck: false
            })
        }
    }

    // 우편번호 찾기 모달 
    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    };

    const handleAddress = (data: any) => {

        console.log(data);

        const address = {
            postCode: data.zonecode,
            mainAddress: data.address,
            detailAddress: ''
        }

        setAddress(address);

        closeModal();
    };

    // 회원가입 메서드
    const insertUser = () => {

        console.log(user);

        if (!(signup.email || signup.verification || signup.nickName || signup.pwd || signup.pwdCheck)) {
            alert("필수 입력사항을 모두 입력해주세요.");
            return;
        }

        axios.post("http://localhost:8013/banju/user/insertUser", user)
            .then(res => {
                const msg = res.data.msg;
                alert(msg);
                dispatch(loginUser(res.data.user));
            })
            .catch(err => {
                const msg = err.response.data.msg;
                alert(msg);
            })
            .finally(() => {
                navi('/');
            })
    }

    return (
        <>
            <div className={styles.elem_container}>

                <label htmlFor="email" className={styles.label}>* 이메일</label>
                <div className={styles.email_container}>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='이메일을 입력해 주세요.'
                        value={user.email}
                        onChange={setUserChange}
                        className={styles.email}
                        ref={inputElement}
                    />
                    <button type="button" className={styles.button} onClick={sendEmail}>
                        인증번호 받기
                    </button>
                </div>

                <label htmlFor='verificationCode' className={styles.label}>* 인증번호</label>
                <div className={styles.code_container}>
                    <input
                        type="number"
                        id='verificationCode'
                        name='verificationCode'
                        placeholder='인증번호'
                        value={code.verificationCode}
                        onChange={setCode}
                        max={999999}
                        className={styles.code}
                    />
                    <button type="button" className={styles.button} onClick={checkCode}>
                        인증번호 확인
                    </button>
                    <p className={signup.verification ? styles.successMessage : styles.errorMessage}>
                        {signup.verification ? "인증번호가 확인되었습니다" : "인증번호가 확인되지 않았습니다."}
                    </p>
                </div>



                <label htmlFor="nickName" className={styles.label}>* 닉네임(2~10글자)</label>
                <div className={styles.nickName_container}>
                    <input
                        type="text"
                        id="nickName"
                        name="nickName"
                        value={user.nickName}
                        onChange={setUserChange}
                        placeholder="2~10자 이내로 입력해주세요."
                        maxLength={10}
                        className={styles.nickName}
                    />
                    <button type="button" className={styles.button} onClick={checkNickName}>
                        중복 확인
                    </button>
                </div>

                <label htmlFor='pwd' className={styles.label}>* 비밀번호</label>
                <div className={styles.pwd_container}>
                    <input
                        type="password"
                        id="pwd"
                        name="pwd"
                        value={user.pwd}
                        onChange={pwdVerify}
                        placeholder="영문/숫자/특수문자 혼합 8~20자"
                        className={styles.pwd}
                    />
                    <p className={signup.pwd ? styles.successMessage : styles.errorMessage}>
                        {signup.pwd ? "안전한 비밀번호 입니다." : "영문/숫자/특수문자(@$!%*#?&) 혼합 8~20자로 만들어주세요."}
                    </p>
                </div>

                <label htmlFor='pwdCheck' className={styles.label}>* 비밀번호 확인</label>
                <div className={styles.pwdCheck_container}>
                    <input
                        type="password"
                        id="pwdCheck"
                        name="pwdCheck"
                        value={pwdCheck}
                        onChange={pwdCheckFnc}
                        placeholder="비밀번호를 한번 더 입력해주세요."
                        className={styles.pwdCheck}
                    />
                    <p className={signup.pwdCheck ? styles.successMessage : styles.errorMessage}>
                        {signup.pwdCheck ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
                    </p>
                </div>

                <label htmlFor="userName" className={styles.label}>이름</label>
                <div className={styles.userName_container}>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={user.userName}
                        onChange={setUserChange}
                        placeholder="이름"
                        className={styles.userName}
                    />
                </div>

                <label htmlFor='phone' className={styles.label}>휴대폰 번호</label>
                <div className={styles.phone_container}>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={setUserChange}
                        placeholder=" - 제외 숫자만 입력"
                        className={styles.phone}
                    />
                </div>

                <label htmlFor='address' className={styles.label}>주소</label>
                <div className={styles.address_container}>
                    <div className={styles.postCode_container}>
                        <input
                            type="text"
                            id='postCode'
                            name='postCode'
                            value={address.postCode}
                            placeholder='우편번호'
                            className={styles.postCode}
                        />
                        <button type="button" className={styles.button} onClick={openModal}>
                            검색
                        </button>
                    </div>
                    <input
                        type="text"
                        id='mainAddress'
                        name='mainAddress'
                        value={address.mainAddress}
                        placeholder='기본 주소'
                        className={styles.mainAddress}
                    />
                    <input
                        type="text"
                        id='detailAddress'
                        name='detailAddress'
                        value={address.detailAddress}
                        placeholder='상세 주소'
                        className={styles.detailAddress}
                        onChange={(e) => {
                            let { value } = e.target as HTMLInputElement;
                            setAddress({
                                ...address,
                                detailAddress: value
                            })

                            const totalAddress = `(${address.postCode}) ${address.mainAddress} ${address.detailAddress}`;

                            setUser(prev => {
                                return { ...prev, address: totalAddress }
                            })
                        }}
                    />
                </div>

                <span>*은 필수 입력사항입니다.</span>

                <button
                    type='button'
                    className={styles.button}
                    style={{
                        width: '50%',
                        alignSelf: 'center',
                        marginTop: '20px'
                    }}
                    onClick={insertUser}
                >회원가입</button>

                <Modal
                    isOpen={modal}
                    className={styles.modal_container}
                    onRequestClose={closeModal} // 모달 외부 클릭 시 닫기
                    overlayClassName={styles.overlay}
                >
                    <div className={styles.modal_header}>
                        <h3 style={{ margin: 5, paddingTop: '10px' }}>우편번호 찾기</h3>
                        <button onClick={closeModal} className={styles.closeButton}>&times;</button>
                    </div>
                    <div className={styles.modal_content}>
                        <DaumPostcode
                            onComplete={handleAddress}
                        />
                    </div>
                </Modal>

            </div>
        </>
    );
};

export default SignUpPage;
