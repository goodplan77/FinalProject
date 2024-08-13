import React, { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import styles from './css/Signup.module.css';
import useInput from '../hook/useInput';
import { initialSignup, Signup } from '../type/signup';
import axios from 'axios';
import { setCookie } from '../utils/Cookie';
import { Button } from 'react-bootstrap';


Modal.setAppElement('#root'); // 모달의 접근성 설정

const SignUpPage: React.FC = () => {

    const [input, setInput] = useInput<Signup>(initialSignup);
    const [modal, setModal] = useState(false);

    const sendEmail = () => {
        axios.post("http://localhost:8013/banju/sendEmail", {
            email : input.email
        })
            .then(res => {
                console.log(res);

                const code = res.data.code;

                setCookie("verificationCode", code);
            })
    }

    const checkCode = ()=>{

    }

    const checkNickName = ()=>{

    }

    const openModal = ()=>{
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    };

    
    // const inputChangeHandler = (e:ChangeEvent) =>{
    //     if(e.target){
    //         const {name,value} = e.target as HTMLInputElement;
    //         setInput({
    //             ...input,
    //             [name] : value
    //         })
    //     }
    // };
    const handleAddressSelect = (data: any) => {
        const fullAddress = data.address;
        let extraAddress = '';
        console.log(fullAddress);


        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
        }

        setForm({
            ...form,
            address: fullAddress, // 기본 주소 필드에 검색된 주소 저장
            addressDetail: extraAddress ? `(${extraAddress})` : '', // 참고 항목을 상세 주소 필드에 저장
            postalCode: data.zonecode, // 우편번호 필드에 검색된 우편번호 저장
        });

        closeModal();
    };


    const [form, setForm] = useState({
        name: '',
        nickname: '',
        email: '',
        authCode: '',
        password: '',
        passwordConfirm: '',
        phone: '',
        birthDate: '',
        address: '',
        addressDetail: '',
        postalCode: '', // 우편번호를 저장하기 위한 필드 추가
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const datepickerRef = useRef<DatePicker>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
            setForm({ ...form, birthDate: formattedDate });
        } else {
            setForm({ ...form, birthDate: '' });
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const navi = useNavigate();

    return (
        <>
            <div className={styles.elem_container}>

                <label htmlFor="email" className={styles.label}>이메일</label>
                <div className={styles.email_container}>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='이메일을 입력해 주세요.'
                        value={input.email}
                        onChange={setInput}
                        className={styles.email} 
                    />
                    <button type="button" className={styles.button} onClick={sendEmail}>
                        인증번호 받기
                    </button>
                </div>

                <label htmlFor='code' className={styles.label}>인증번호</label>
                <div className={styles.code_container}>
                    <input 
                        type="number"
                        id='code'
                        name='code'
                        placeholder='인증번호'
                        onChange={setInput}
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
                        value={input.userName}
                        onChange={setInput}
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
                        value={input.nickName}
                        onChange={setInput}
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
                        value={input.pwd}
                        onChange={setInput}
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
                        onChange={setInput}
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
                        value={input.phone}
                        onChange={setInput}
                        placeholder=" - 제외 숫자만 입력"
                        className={styles.phone}
                    />
                </div>

                <label htmlFor='birthday' className={styles.label}>생년월일</label>
                <div className={styles.birthday_container}>
                    <input
                        type='date'
                        id='birthday'
                        name='birthday'
                        onChange={setInput}
                        className={styles.birthday}
                    />
                </div>

                <label htmlFor='address' className={styles.label}>주소</label>
                <div className={styles.address_container}>
                    <input 
                        type="text"
                        id='address'
                        name='address'
                        onChange={setInput}
                        placeholder='우편번호'
                        className={styles.address}
                    />
                    <button type="button" className={styles.button} onClick={openModal}>
                        검색
                    </button>
                </div>

                <div className={styles.formGroup}>
                        <label htmlFor="postalCode" className={styles.label}>우편번호</label>
                        <div style={{ alignItems: 'center', display: 'flex' }}>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={form.postalCode}
                                onChange={handleChange}
                                placeholder="우편번호"
                                className={styles.input}
                                style={{ width: '318px' }}
                            />
                            <button type="button" className={styles.inlineButton} onClick={openModal} style={{ width: '55px', fontSize: '10px' }}>
                                우편번호 찾기
                            </button>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.label} />
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="기본주소"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="addressDetail" className={styles.label} />
                        <input
                            type="text"
                            id="addressDetail"
                            name="addressDetail"
                            value={form.addressDetail}
                            onChange={handleChange}
                            placeholder="상세주소"
                            className={styles.input}
                        />
                    </div>



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
                            onComplete={handleAddressSelect}
                        />
                    </div>
                </Modal>

                {/* <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal} // 모달 외부 클릭 시 닫기
                    className={styles.modal}
                    overlayClassName={styles.overlay}
                    shouldCloseOnOverlayClick={true} // 오버레이 클릭 시 모달 닫기
                >
                    <div className={styles.modalHeader}>
                        <h2>주소 찾기</h2>
                        <button onClick={closeModal} className={styles.closeButton}>닫기</button>
                    </div>
                    <div className={styles.modalContent}>
                        <DaumPostcode onComplete={handleAddressSelect} />
                    </div>
                </Modal> */}




            </div>



                <form className={styles.form}>
                    
                    
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>비밀번호</label>
                        <div className={styles.inputContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="영문/숫자/특수문자 혼합 8~20자"
                                className={styles.input}
                            />
                            <button type="button" onClick={toggleShowPassword} className={styles.toggleButton}>
                                {showPassword ? "숨김" : "표시"}
                            </button>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="passwordConfirm" className={styles.label}>비밀번호 재확인</label>
                        <div className={styles.inputContainer}>
                            <input
                                type={showPasswordConfirm ? "text" : "password"}
                                id="passwordConfirm"
                                name="passwordConfirm"
                                value={form.passwordConfirm}
                                onChange={handleChange}
                                placeholder="비밀번호를 한번 더 입력해주세요"
                                className={styles.input}
                            />
                            <button type="button" onClick={toggleShowPasswordConfirm} className={styles.toggleButton}>
                                {showPasswordConfirm ? "숨김" : "표시"}
                            </button>
                        </div>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="birthDate" className={styles.label}>생년월일</label>
                        <div className={styles.inputContainer}>
                            <DatePicker
                                ref={datepickerRef}
                                selected={form.birthDate ? new Date(form.birthDate) : null}
                                onChange={handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                customInput={
                                    <input
                                        type="text"
                                        id="birthDate"
                                        name="birthDate"
                                        value={form.birthDate}
                                        placeholder="YYYY / MM / DD"
                                        className={styles.input}
                                        readOnly
                                    />
                                }
                            />
                            <div className={styles.calendarIcon} onClick={() => datepickerRef.current?.setOpen(true)}></div>
                        </div>
                    </div>
                    
                    <button type="submit" className={styles.submitButton}>
                        회원 가입
                    </button>
                </form>

                
        </>
    );
};

export default SignUpPage;
