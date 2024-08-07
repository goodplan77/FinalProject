import React, { useState } from 'react';
import './css/Signup.css';

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
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    return (
        <div className="container">
            <div className="header">
                <button className="back-button"></button>
                <span className="title">회원 가입</span>
                <div></div>
            </div>
            <form className="form">
                <div className="form-group">
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="반주한상"
                    />
                    <div className="error">* 이름을 입력해주세요.</div>
                </div>
                <div className="form-group-inline">
                    <label htmlFor="nickname">닉네임</label>
                    <div className="input-inline">
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            placeholder="2~6자 이내로 입력해주세요"
                        />
                        <button type="button" className="inline-button">
                            중복 확인
                        </button>
                    </div>
                    <div className="error">* 닉네임을 입력해주세요.</div>
                </div>
                <div className="form-group-inline">
                    <label htmlFor="email">이메일</label>
                    <div className="input-inline">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="@를 포함한 이메일 주소를 입력해주세요"
                        />
                        <button type="button" className="inline-button">
                            인증번호
                        </button>
                    </div>
                </div>
                <div className="form-group-inline">
                    <label htmlFor="authCode">인증 번호</label>
                    <div className="input-inline">
                        <input
                            type="text"
                            id="authCode"
                            name="authCode"
                            value={form.authCode}
                            onChange={handleChange}
                            placeholder="인증번호를 입력해주세요"
                        />
                        <button type="button" className="inline-button">
                            인증하기
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <div className="input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="영문/숫자/특수문자 혼합 8~20자"
                        />
                        <button type="button" className="toggle-button" onClick={toggleShowPassword}>
                            {showPassword ? "숨김" : "표시"}
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">비밀번호 재확인</label>
                    <div className="input-container">
                        <input
                            type={showPasswordConfirm ? "text" : "password"}
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={form.passwordConfirm}
                            onChange={handleChange}
                            placeholder="비밀번호를 한번 더 입력해주세요"
                        />
                        <button type="button" className="toggle-button" onClick={toggleShowPasswordConfirm}>
                            {showPasswordConfirm ? "숨김" : "표시"}
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">연락처</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="‘-’를 제외한 숫자만 입력해주세요"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthDate">생년월일</label>
                    <div className="input-container">
                        <input
                            type="text"
                            id="birthDate"
                            name="birthDate"
                            value={form.birthDate}
                            onChange={handleChange}
                            placeholder="YYYY / MM / DD"
                        />
                        <div className="calendar-icon"></div>
                    </div>
                </div>
                <div className="form-group-inline">
                    <label htmlFor="address">주소</label>
                    <div className="input-inline">
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="우편번호"
                        />
                        <button type="button" className="inline-button">
                            우편번호
                        </button>
                    </div>
                    <input
                        type="text"
                        name="addressDetail"
                        value={form.addressDetail}
                        onChange={handleChange}
                        placeholder="기본주소"
                        style={{ marginTop: '10px' }}
                    />
                    <input
                        type="text"
                        name="addressDetail"
                        value={form.addressDetail}
                        onChange={handleChange}
                        placeholder="상세주소"
                        style={{ marginTop: '10px' }}
                    />
                </div>
                <button type="submit" className="submit-button">
                    회원 가입
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;
