import { useNavigate } from 'react-router-dom';
import styles from './styles/FindUserPassword.module.css';

export default function FindUserPassword() {

    const navi = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <label className={styles.label}>
                    이름 <span className={styles.required}>•</span>
                </label>
                <div className={styles.rectangle}>
                    <input
                        className={styles.inputPlaceholder}
                        placeholder="이름을 입력하세요."
                    />
                </div>

                <div className={styles.inputInstruction}>
                    비밀번호 찾을 방법을 선택해주세요.
                </div>

                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input type="radio" name="findPasswordMethod" defaultChecked />
                        전화번호
                    </label>
                    <div className={styles.rectangle}>
                        <input
                            className={styles.inputPlaceholder}
                            placeholder="전화번호를 입력하세요."
                        />
                    </div>

                    <label className={styles.radioLabel}>
                        <input type="radio" name="findPasswordMethod" />
                        이메일
                    </label>
                    <div className={styles.rectangle}>
                        <input
                            className={styles.inputPlaceholder}
                            placeholder="이메일을 입력하세요."
                        />
                    </div>
                </div>

                <div className={styles.notice}>
                    소셜로그인을 통해 가입 및 연동하신 경우 비밀번호가 없습니다.<br />
                    해당 소셜로그인 고객센터를 통해 확인해주세요.
                </div>

                <div className={styles.button}>
                    <span className={styles.buttonText} onClick={() => navi('/changePassword')}>다 음</span>
                </div>
            </div>
        </>
    )
}