import axios from 'axios';
import styles from './styles/NotifyBoardInsertPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export default function NotifyBoardUpdatePage() {

    const navi = useNavigate();
    const cacheBoard = useSelector((state: RootState) => state.boards);
    const [board , setBoard] = useState(cacheBoard.oneBoard);

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let {name , value} = e.target;
        setBoard({
            ...board,
            [name] : value
        })
    }

    function notifyBoardUpdate() {
        const updatedBoard = {
            ...board,
            boardCode: 'N'
        };

        axios.post("http://localhost:8013/banju/admin/board/updateBoard" , updatedBoard)
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
            <h1 className={styles.title}>공지사항 수정</h1>
            <div className={styles.formContainer}>
                <div className={styles.inputField}>
                    <label className={styles.inputLabel}>제목</label>
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        className={styles.textInput}
                        onChange={handleInputChange}
                        name = "title"
                        value={board.title}
                    />
                </div>
                <div className={styles.inputField}>
                    <label className={styles.inputLabel}>내용 작성</label>
                    <textarea
                        placeholder="내용을 입력하세요."
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
                        notifyBoardUpdate();
                        }}>작성</button>
                </div>
            </div>
        </div>
    )
}