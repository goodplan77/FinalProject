import axios from "axios";
import { Board } from "../type/board"
import styles from "./css/UpdateModal.module.css"

export default function UpdateModal ({board , hideModal} : {board:Board|undefined|null , hideModal: () => void}) {
    
    const updateCheckList = () => {
        if(board){
            switch(board.status){
                case 'Y' : board = {...board , status : 'B'}; break;
                case 'B' : board = {...board , status : 'Y'}; break;
            }
            
            axios.post("http://localhost:8013/banju/admin/board/updateBoard" , board)
                .then((response) => {
                    alert(response.data.msg);
                    hideModal();
                }).catch((error) => {
                    alert(error.response.data.msg);
                    hideModal();
                })
        }
       
    }
    
    return(
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
                            <span>{board.boardNo}</span>
                            <br/>
                            <span>{board.title}</span>
                            <br/>
                            <span>{board.enrollDate}</span>
                            <br/>
                            <span>{board.modifyDate}</span>
                            <br/>
                            <br/>
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