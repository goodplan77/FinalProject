import axios from "axios";
import { Board } from "../type/board"
import styles from "./css/UpdateModal.module.css"

export default function DeleteModal ({boards , hideModal} : {boards:Board[]|undefined|null; hideModal: () => void}) {
    
    const deleteCheckList = () => {
        axios.post("http://localhost:8013/banju/admin/board/deleteboards" , boards)
                .then((response) => {
                    alert(response.data.msg);
                    hideModal();
                }).catch((error) => {
                    alert(error.response.data.msg);
                    hideModal();
                })
    }

    return(
        <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>게시글 삭제</h2>
                        <button className={styles.closeButton} onClick={hideModal}>X</button>
                    </div>
                    <div className={styles.modalBody}>
                       {
                        boards ? 
                        <>
                        {
                            boards.map((board)=> {
                                return(
                                    <>
                                        <div>
                                            <h3>{board.title}</h3>
                                            <div>{board.boardNo}</div>
                                            <div>{board.enrollDate}</div>
                                            <div>{board.modifyDate}</div>
                                        </div>
                                        <br/>
                                    </>
                                )
                            })
                        }
                        <h3>해당 게시글 {boards.length}개를 삭제 하시겠습니까?</h3>
                        </> 
                        : 
                        <>
                        </>
                       }
                    </div>
                    <div className={styles.modalFooter}>
                        <button className={styles.cancelButton} onClick={hideModal}>취소</button>
                        <button className={styles.confirmButton} onClick={deleteCheckList}>삭제</button>
                    </div>
                </div>
        </div> 
    )
}