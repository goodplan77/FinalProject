import { useNavigate } from 'react-router-dom';
import styles from './styles/FindUserId.module.css';
import { useState } from 'react';

export default function SearchUserId() {
    const navi = useNavigate();

    const [method, setMethod] = useState('phone');

    const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMethod(event.target.value);
    };

    return (
        <>
            <div className={styles.container}>
                <label className={styles.label}>
                    이름 <span className={styles.required}>•</span>
                </label>
                <div className={styles.rectangle}>
                    <input
                        type="text"
                        className={styles.inputPlaceholder}
                        placeholder="이름을 입력하세요."
                    />
                </div>

                <div className={styles.inputInstruction}>
                    아이디를 찾을 방법을 선택해주세요.
                </div>

                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="findIdMethod"
                            value="nickname"
                            checked={method === 'nickname'}
                            onChange={handleMethodChange}
                        />
                        닉네임
                    </label>
                    <div className={styles.rectangle}>
                        <input
                            type="text"
                            className={styles.inputPlaceholder}
                            placeholder="닉네임을 입력하세요."
                            disabled={method !== 'nickname'}
                        />
                    </div>

                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="findIdMethod"
                            value="phone"
                            checked={method === 'phone'}
                            onChange={handleMethodChange}
                        />
                        휴대전화
                    </label>
                    <div className={styles.rectangle}>
                        <input
                            type="text"
                            className={styles.inputPlaceholder}
                            placeholder="휴대전화 번호를 입력하세요."
                            disabled={method !== 'phone'}
                        />
                    </div>
                </div>

                <button className={styles.button} onClick={() => navi('/successUserId')}>
                    <span className={styles.confirmText}>확인</span>
                </button>
            </div>
        </>
    )
}