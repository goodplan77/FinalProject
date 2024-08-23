import axios from "axios";
import { Board } from "../type/board"
import styles from "./css/UpdateModal.module.css"

export default function UpdateModal({ board, hideModal }: { board: Board | undefined | null, hideModal: () => void }) {

    const viewType = (value: string) => {
        switch (value) {
            case 'C': return '일반';
            case 'S': return '중고';
            case 'A': return '입양';
            case 'M': return '실종';
            case 'I': return '정보';
            case 'E': return '이벤트';
            case 'N': return '공지사항';
        }
    }

    const updateCheckList = () => {
        if (board) {
            switch (board.status) {
                case 'Y': board = { ...board, status: 'B' }; break;
                case 'B': board = { ...board, status: 'Y' }; break;
            }

            axios.post("http://localhost:8013/banju/admin/board/updateBoard", board)
                .then((response) => {
                    alert(response.data.msg);
                    hideModal();
                }).catch((error) => {
                    alert(error.response.data.msg);
                    hideModal();
                })
        }
    }

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>게시글 활성화 변경</h2>
                    <button className={styles.closeButton} onClick={hideModal}>X</button>
                </div>
                <div className={styles.modalBody}>
                    {
                        board ?
                            <>
                                {(board.status == 'Y') ? (<h3>비 활성화 상태로 변경</h3>) : (<h3>활성화 상태로 변경</h3>)}
                                <h2>{board.title}</h2>
                                <div>
                                    <th>게시글 타입 : </th>
                                    <td>{viewType(board.boardCode)}</td>
                                </div>
                                <div>
                                    <th>작성 회원 고유 ID : </th>
                                    <td>{board.userNo}</td>
                                </div>
                                <div>
                                    <th>작성 게시글 고유 ID : </th>
                                    <td>{board.boardNo}</td>
                                </div>
                                <div>
                                    <th>작성 날짜 : </th>
                                    <td>{board.enrollDate}</td>
                                </div>
                                <div>
                                    <th>수정 날짜 : </th>
                                    <td>{board.modifyDate ? board.modifyDate : '수정 기록 없음'}</td>
                                </div>
                                <div>
                                    <th>조회수 : </th>
                                    <td>{board.views}</td>
                                </div>
                                <div>
                                    <th>좋아요 : </th>
                                    <td>{board.likes}</td>
                                </div>
                                <div>
                                    <th>게시글 내용 : </th>
                                </div>
                                <div className={styles.scrollableContent}>
                                    <td>{board.content}</td>
                                </div>
                                <h3>해당 게시글 상태를 변경 하시겠습니까?</h3>
                            </>
                            :
                            <>
                            </>
                    }
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={hideModal}>취소</button>
                    <button className={styles.confirmButton} onClick={updateCheckList}>변경</button>
                </div>
            </div>
        </div>
    )
}