import axios from "axios";
import { Board } from "../type/board"
import styles from "./css/DetailModal.module.css"
import { useEffect } from "react";

export default function DetailModal ({board , hideModal} : {board:Board|undefined|null , hideModal: () => void}) {
    
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
                    {board && (<>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{board?.title}</h2>
                            <button className={styles.closeButton} onClick={hideModal}>X</button>
                        </div>
                        <div className={styles.modalBody}>
                        
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelButton} onClick={hideModal}>취소</button>
                            <button className={styles.confirmButton} onClick={updateCheckList}>변경</button>
                        </div>
                    </>)}
                </div>
        </div> 
    )
}