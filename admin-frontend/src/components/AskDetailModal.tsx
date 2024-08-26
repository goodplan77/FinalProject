import axios from "axios";
import styles from "./css/DetailModal.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ask } from "../type/ask";

export default function AskDetailModal ({ask , hideModal} : {ask:ask|undefined|null , hideModal: () => void}) {
    
    const navi = useNavigate();
    const [askContent , setAskContent] = useState(ask);

    useEffect(() => {
        if(ask){
            const askRefNo = ask.askNo;
            axios.post(`http://localhost:8013/banju/admin/alarm/updateReadStatus/A/${askRefNo}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((response) =>{
                    console.log(response);
                })
        }
      }, []);

    function handleInputChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
        let {name , value} = e.target;
        if(askContent){
            setAskContent({
                ...askContent,
                [name] : value
            });
        }
    }

    const updateask = () =>{
        if(askContent){
            axios.post("http://localhost:8013/banju/admin/ask/updateAsk" , askContent)
            .then((response) => {
                alert(response.data.msg);
                hideModal();
                navi('../askManagePage');
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    
    return(
        <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    {ask && (<>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>문의 상세 보기</h2>
                            <button className={styles.closeButton} onClick={hideModal}>X</button>
                        </div>
                        <div className={styles.modalBody}>
                            <h2>{ask.title}</h2>
                            <div>
                                <th>작성 회원 고유 ID</th>
                                <td>{ask.userNo}</td>
                            </div>
                            <div>
                                <th>문의 고유 ID</th>
                                <td>{ask.askNo}</td>
                            </div>
                            <div>
                                <th>작성 날짜</th>
                                <td>{ask.askDate}</td>
                            </div>
                            <div> 
                                <th>답변 날짜</th>
                                <td>{ask.resDate ? ask.resDate : '답변 기록 없음'}</td>
                            </div>
                            <div>
                                <th>문의 내용</th>
                                <td>{ask.content}</td>
                            </div>
                            <div>
                                <th>답변 내용</th>
                                <td>{ask.resContent ? ask.resContent: (
                                    <>
                                        <label>내용 작성</label>
                                        <textarea
                                        placeholder="내용을 입력하세요."
                                        className={styles.textArea}
                                        onChange={handleInputChange}
                                        name = "resContent"
                                        value={askContent?.resContent}
                                        />
                                    </>
                                )}</td>
                            </div>
                            <div>                
                            </div>
                        </div>
                        {
                            ask.resContent?.length>0 ? '' : (
                                <div className={styles.modalFooter}>
                                <button className={styles.cancelButton} onClick={hideModal}>취소</button>
                                <button className={styles.confirmButton} onClick={updateask}>답변</button>
                            </div>
                            )
                        }     
                    </>)}
                </div>
        </div> 
    )
}