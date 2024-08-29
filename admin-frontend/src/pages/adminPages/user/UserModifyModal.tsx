import axios from "axios";
import { User } from "../../../type/user"
import styles from "./styles/UserModifyModal.module.css"
import { useState } from "react";

export default function UserModifyModal({ user, hideModal }: { user: User, hideModal: () => void }) {

    const [data, setData] = useState<User>(user);

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let {name , value} = e.target;
        setData({
            ...data,
            [name] : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault(); // 폼 제출 방지
        if(window.confirm("해당 회원 정보를 수정 하시겠습니까?")){
            axios.post('http://localhost:8013/banju/admin/user/updateuser' , data)
            .then((response) => {
                alert(response.data.msg);
                hideModal();
                window.location.reload();
            })
            .catch((response) => {
                console.log(response);
            })
        } else {
            alert("정보 수정이 취소 되었습니다.");
        }
    }

    const hideModalCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(window.confirm("정보 수정 중입니다. 나가시겠습니까?")){
            hideModal();
        } 
    }

    const reverseCheck = () => {
        const newStatus = data.status === 'Y' ? 'B' : 'Y';
        setData({ ...data, status: newStatus });
    };

    return (
        <div className={styles.modalBackground}>
            <form className={styles.modalContainer} onSubmit={handleSubmit}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>회원 정보 변경</h2>
                    <button type="button" className={styles.closeButton} onClick={hideModalCheck}>X</button>
                </div>
                    <div className={styles.editInput}>
                        <span className={styles.infoEditLabel}>닉네임</span>
                        <br/>
                        <input
                            onChange={handleInputChange}
                            name = "nickName"
                            value={data.nickName}
                            maxLength={50}
                        />
                    </div>
                    <div className={styles.editInput}>
                        <span className={styles.infoEditLabel}>이메일</span>
                        <br/>
                        <input
                            onChange={handleInputChange}
                            name = "email"
                            value={data.email}
                        />
                    </div>
                    <div className={styles.editInput}>
                        <span className={styles.infoEditLabel}>연락처</span>
                        <br/>
                        <input
                            onChange={handleInputChange}
                            name = "phone"
                            value={data.phone}
                            maxLength={13}
                        />
                    </div>
                    <div className={styles.editInput}>
                        <span className={styles.infoEditLabel}>주소</span>
                        <br/>
                        <input
                            onChange={handleInputChange}
                            name = "address"
                            value={data.address}
                        />
                    </div>
                    <br/>
                    <div className={styles.infoEditItem}>
                        <div className={styles.infoEditLabel}>활성화 상태</div>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={data.status === 'Y'}
                                    onChange={reverseCheck}
                                />
                                <span className={styles.slider}></span>
                        </label>
                    </div>
                <div className={styles.modalFooter}>
                    <button type="button" className={styles.cancelButton} onClick={hideModalCheck}>취소</button>
                    <button className={styles.submitButton} type='submit'>변경</button>
                </div>
            </form>
        </div>
    )
}