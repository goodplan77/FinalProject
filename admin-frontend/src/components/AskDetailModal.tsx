import axios from "axios";
import styles from "./css/AskDetailModal.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ask } from "../type/ask";
import { useDispatch } from "react-redux";
import { decrementAskCount } from "../features/alarmSlice";

export default function AskDetailModal ({ask , hideModal} : {ask:ask|undefined|null , hideModal: () => void}) {
    
    const navi = useNavigate();
    const dispatch = useDispatch();
    const [askContent , setAskContent] = useState(ask);

    useEffect(() => {
        if(ask){
            const askRefNo = ask.askNo;
            axios.post(`http://localhost:8013/banju/admin/alarm/updateReadStatus/A/${askRefNo}`)
                .then((response) => {
                    console.log(response.data);
                    dispatch(decrementAskCount())
                })
                .catch((error) =>{
                    console.log(error.response.data);
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
                                <br/>
                                <div>{ask.resContent ? ask.resContent: (
                                    <>
                                        <textarea
                                        placeholder="내용을 입력하세요."
                                        className={styles.textArea}
                                        onChange={handleInputChange}
                                        name = "resContent"
                                        value={askContent?.resContent}
                                        />
                                    </>
                                )}</div>
                            </div>
                            <div>                
                            </div>
                        </div>
                        {
                            ask.resContent?.length>0 ? '' : (
                            <div className={styles.modalFooter}>
                                <button className={styles.modifyButton} onClick={updateask}>수정</button>
                            </div>
                            )
                        }     
                    </>)}
                </div>
        </div> 
    )
}