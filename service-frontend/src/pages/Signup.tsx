import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import styles from './css/Signup.module.css';


Modal.setAppElement('#root'); // 모달의 접근성 설정

const SignUpPage: React.FC = () => {
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
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div onClick={() => navi('/login')} className={styles.backButton}>
                        <img src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" className={styles.backIcon} />
                    </div>
                    <span className={styles.title}>회원 가입</span>
                    <div></div>
                </div>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="반주한상"
                            className={styles.input}
                        />
                        <div className={styles.error} style={{ textAlign: 'left' }}>* 이름을 입력해주세요.</div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nickname" className={styles.label}>닉네임</label>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="nickname"
                                name="nickname"
                                value={form.nickname}
                                onChange={handleChange}
                                placeholder="2~6자 이내로 입력해주세요"
                                className={styles.inputInline}
                            />
                            <button type="button" className={styles.inlineButton}>
                                중복 확인
                            </button>
                        </div>
                        <div className={styles.error} style={{ textAlign: 'left' }}>* 닉네임을 입력해주세요.</div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>이메일</label>
                        <div className={styles.inputContainer}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="@를 포함한 이메일 주소를 입력해주세요"
                                className={styles.inputInline}
                            />
                            <button type="button" className={styles.inlineButton}>
                                인증번호
                            </button>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="authCode" className={styles.label}>인증 번호</label>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="authCode"
                                name="authCode"
                                value={form.authCode}
                                onChange={handleChange}
                                placeholder="인증번호를 입력해주세요"
                                className={styles.inputInline}
                            />
                            <button type="button" className={styles.inlineButton}>
                                인증하기
                            </button>
                        </div>
                    </div>
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
                        <label htmlFor="phone" className={styles.label}>연락처</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="‘-’를 제외한 숫자만 입력해주세요"
                            className={styles.input}
                        />
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
                    <button type="submit" className={styles.submitButton}>
                        회원 가입
                    </button>
                </form>

                <Modal
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
                </Modal>
            </div>
        </>
    );
};

export default SignUpPage;
