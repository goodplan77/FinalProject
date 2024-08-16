import { useState } from 'react';
import styles from './NotifyBoardInsertPage.module.css';
import { initialBoard } from '../../type/board';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NotifyBoardInsertPage() {

    const navi = useNavigate();
    const [board , setBoard] = useState(initialBoard);
    
    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let {name , value} = e.target;
        setBoard({
            ...board,
            [name] : value
        })
    }

    function notifyBoardInsert() {
        axios.post("http://localhost:8013/banju/admin/board/insertNofityboard" , board)
            .then((response) => {
                alert(response.data.msg);
                navi('../nonifyBoardManage');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>공지사항 작성</h1>
            <div className={styles.formContainer}>
                <div className={styles.inputField}>
                    <label className={styles.inputLabel}>제목</label>
                    <input
                        type="text"
                        placeholder="공지사항 제목을 입력하세요"
                        className={styles.textInput}
                        onChange={handleInputChange}
                        name = "title"
                        value={board.title}
                    />
                </div>
                <div className={styles.inputField}>
                    <label className={styles.inputLabel}>내용 작성</label>
                    <textarea
                        placeholder="공지사항 내용을 입력하세요."
                        className={styles.textArea}
                        onChange={handleInputChange}
                        name = "content"
                        value={board.content}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button className={styles.cancelButton } onClick={() => {
                        navi('../nonifyBoardManage');
                        }}>취소</button>
                    <button className={styles.submitButton} onClick={() => {
                        notifyBoardInsert();
                        }}>작성</button>
                </div>
            </div>
        </div>
    )
}