import axios from "axios";
import styles from "./css/DetailModal.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { report } from "../type/report";
import { Board, Comment } from "../type/board";
import { User } from "../type/user";
import { useDispatch } from "react-redux";
import { decrementReportCount } from "../features/alarmSlice";

export default function DetailReportModal ({report , hideModal} : {report:report|undefined|null , hideModal: () => void}) {
    
    const navi = useNavigate();
    const dispatch = useDispatch();
    const [data , setData] = useState<Board|Comment|User|null>(null);

    useEffect(() => {
        if(report){
            const reportRefNo = report.reportNo;
            axios.post(`http://localhost:8013/banju/admin/alarm/updateReadStatus/R/${reportRefNo}`)
                .then((response) => {
                    console.log(response.data);
                    dispatch(decrementReportCount());
                })
                .catch((error) =>{
                    console.log(error.response.data);
                })

            switch(report.typeCode){
                case 'B': searchBoard(report.refNo); break;
                case 'C': searchComment(report.refNo); break;
                case 'U': searchUser(report.refNo); break;
                default :
                    console.error('신고 타입을 불러오는데 실패했습니다.');
            }
        }
      }, []);

      function searchBoard(refNo:number) {
        axios.get(`http://localhost:8013/banju/board/boardDetail/${refNo}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((response) =>{
                console.log(response);
            })
      }

      function searchComment(refNo:number) {
        axios.get(`http://localhost:8013/banju/comment/selectComment/${refNo}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((response) =>{
                console.log(response);
            })
      }

      function searchUser(refNo:number) {
        axios.get(`http://localhost:8013/banju/admin/user/UserDetail/${refNo}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((response) =>{
                console.log(response);
            })
      }

      return(
        <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    {report && (<>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>신고 상세 보기</h2>
                            <button className={styles.closeButton} onClick={hideModal}>X</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div>
                                <th>RID </th>
                                <td>{report.reportNo}</td>
                            </div>
                            <div>
                                <th>회원 닉네임 </th>
                                <td>{report.nickName}</td>
                            </div>
                            <div>
                                <th>신고 분류 </th>
                                <td>{report.category}</td>
                            </div>
                            <div>
                                <th>내용 </th>
                                <td>{report.content}</td>
                            </div>
                            <div>
                                <th>신고 날짜 </th>
                                <td>{report.reportDate}</td>
                            </div>
                            <div>
                                <th>신고 타겟 고유 ID </th>
                                <td>{report.refNo}</td>
                            </div>
                        </div>
                    </>)}
                    <div className={styles.modalBody}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>신고 내용 상세 보기</h2>
                        </div>
                    </div>
                    {
                            data && (
                                <>
                                    { 
                                        ('boardNo' in data) && (                           
                                            <div className={styles.modalBody}>
                                                    <div>
                                                        <th>작성 회원 고유 ID</th>
                                                        <td>{(data as Board).userNo}</td>
                                                    </div>
                                                    <div>
                                                        <th>작성 게시글 고유 ID</th>
                                                        <td>{(data as Board).boardNo}</td>
                                                    </div>
                                                    <div>
                                                        <th>작성 날짜</th>
                                                        <td>{(data as Board).enrollDate}</td>
                                                    </div>
                                                    <div> 
                                                        <th>수정 날짜</th>
                                                        <td>{(data as Board).modifyDate ? (data as Board).modifyDate : '수정 기록 없음'}</td>
                                                    </div>
                                                    <div>
                                                        <th>조회수</th>
                                                        <td>{(data as Board).views}</td>
                                                    </div>
                                                    <div>
                                                        <th>좋아요</th>
                                                        <td>{(data as Board).likes}</td>
                                                    </div>
                                                    <div>
                                                        <th>게시글 내용</th>
                                                        <td>{(data as Board).content}</td>
                                                    </div>
                                            </div>
                                        )
                                    }
                                    {
                                        ('commentNo' in data) && (
                                            // 이 블록은 `data`가 `Comment` 타입일 때만 실행됩니다.
                                            <div>Comment: {data.commentNo}</div>
                                        )
                                    }
                                </>
                            )
                        }
                </div>
        </div> 
    )
}