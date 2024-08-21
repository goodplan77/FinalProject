import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import styles from './css/Signup.module.css';
import useInput from '../hook/useInput';
import { Code, initCode } from '../type/signup';
import axios from 'axios';
import { getCookie, setCookie } from '../utils/Cookie';
import { initUser, User } from '../type/user';

Modal.setAppElement('#root'); // 모달의 접근성 설정

const SignUpPage: React.FC = () => {

    const [user, setUser] = useState<User>(initUser);
    const setUserChange = (e:ChangeEvent) => {
        let {name, value} = e.target as HTMLInputElement;
        setUser({
            ...user,
            [name] : value
        });
    }

    const [modal, setModal] = useState(false);
    const [code, setCode] = useInput<Code>(initCode);
    const [address, setAddress] = useState({
        postCode : '',
        mainAddress : '',
        detailAddress : ''
    });

    const navi = useNavigate();

    // 이메일 중복체크 & 발송
    const sendEmail = () => {

        // 이메일 중복 체크 메서드
        axios.post("http://localhost:8013/banju/user/sendEmail", {
            email : user.email
        })
        .then(res => {
            const msg = res.data.msg;
            const verificationCode = res.data.verificationCode;

            alert(msg);

            setCookie("verificationCode", verificationCode);
        })
        .catch(error=>{
            const msg = error.response.data.msg;
            alert(msg);
        })
    }

    // 인증코드 확인 메서드
    const checkCode = ()=>{

        const userCode = getCookie("verificationCode");

        if(code.verificationCode == userCode){
            alert("인증번호가 확인되었습니다.");
        }else{
            alert("인증번호가 다릅니다.");
        }
    }

    // 닉네임 중복체크
    const checkNickName = ()=>{
        axios({
            method : 'get',
            url : "http://localhost:8013/banju/user/checkNickName",
            params : {
                nickName : user.nickName
            }
        }).then(res =>{
            console.log(res);
            alert(res.data);
        })
    }

    // 우편번호 찾기 모달 
    const openModal = ()=>{
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    };

    const handleAddress = (data: any) => {

        console.log(data);
        
        const address = {
            postCode : data.zonecode,
            mainAddress:data.address,
            detailAddress : ''
        }

        setAddress(address);

        closeModal();
    };

    // 회원가입 메서드
    const signup = ()=>{

        axios.post("http://localhost:8013/banju/user/insertUser", user)
            .then(res=>{
                const msg = res.data.msg;
                alert(msg);
            })
            .catch(err=>{
                const msg = err.response.data.msg;
                alert(msg);
            })
            .finally(()=>{
                navi('/');
            })
    }

    return (
        <>
            <div className={styles.elem_container}>

                <button type='button' onClick={()=>navi('/login')}>로그인</button>

                <label htmlFor="email" className={styles.label}>이메일</label>
                <div className={styles.email_container}>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='이메일을 입력해 주세요.'
                        value={user.email}
                        onChange={setUserChange}
                        className={styles.email} 
                    />
                    <button type="button" className={styles.button} onClick={sendEmail}>
                        인증번호 받기
                    </button>
                </div>

                <label htmlFor='verificationCode' className={styles.label}>인증번호</label>
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

                <label htmlFor="nickName" className={styles.label}>닉네임(2~10글자)</label>
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

                <label htmlFor='pwd' className={styles.label}>비밀번호</label>
                <div className={styles.pwd_container}>
                    <input
                        type="password"
                        id="pwd"
                        name="pwd"
                        value={user.pwd}
                        onChange={setUserChange}
                        placeholder="영문/숫자/특수문자 혼합 8~20자"
                        className={styles.pwd}
                    />
                </div>

                <label htmlFor='pwdCheck' className={styles.label}>비밀번호 확인</label>
                <div className={styles.pwdCheck_container}>
                    <input
                        type="password"
                        id="pwdCheck"
                        name="pwdCheck"
                        // onChange={(e) => {
                        //     let {value} = e.target as HTMLInputElement;
                        // }}
                        placeholder="비밀번호를 한번 더 입력해주세요."
                        className={styles.pwdCheck}
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
                        onChange={(e) => {
                            let {value} = e.target as HTMLInputElement;
                            setAddress({
                                ...address,
                                detailAddress : value
                            })
                            
                            const totalAddress = `(${address.postCode}) ${address.mainAddress} ${address.detailAddress}`;

                            setUser(prev => {
                                return {...prev, address : totalAddress}
                            })
                        }}
                        placeholder='상세 주소'
                        className={styles.detailAddress}
                    />
                </div>

                <button 
                    type='button' 
                    className={styles.button}
                    style={{
                        width : '50%',
                        alignSelf : 'center',
                        marginTop : '50px'
                    }}
                    onClick={signup}
                >회원가입</button>

                <Modal 
                    isOpen={modal}
                    className={styles.modal_container}
                    onRequestClose={closeModal} // 모달 외부 클릭 시 닫기
                    overlayClassName={styles.overlay}
                >
                    <div className={styles.modal_header}>
                        <h3 style={{margin : 5, paddingTop : '10px'}}>우편번호 찾기</h3>
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
