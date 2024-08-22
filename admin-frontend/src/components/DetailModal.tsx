import axios from "axios";
import { Board } from "../type/board"
import styles from "./css/DetailModal.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DetailModal ({board , hideModal} : {board:Board|undefined|null , hideModal: () => void}) {
    
    const navi = useNavigate();

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [buttonArea , setButtonArea] = useState(false);
    const [imageArea , setImageArea] = useState(false);

    useEffect(() => {
        if(board){
            let apiRequestURL = "";
            switch(board.boardCode){
                case 'C': 
                case 'S': 
                case 'A':
                case 'M':
                    apiRequestURL = `http://localhost:8013/banju/api/board/admin/board/${board.boardCode}/${board.boardNo}`;
                    break;
                case 'I':
                case 'E':
                    apiRequestURL = `http://localhost:8013/banju/api/board/admin/board/${board.boardCode}/${board.boardNo}`;
                    setButtonArea(true);
                    break;
                case 'N':
                    setButtonArea(true);
                    break;
                default :
                    alert("게시판 타입을 불러오는데 실패했습니다.");
            }

            if(apiRequestURL.length>0){
                axios.get(apiRequestURL, {
                    responseType: 'blob',
                  })
                  .then((response) => {
                    const url = URL.createObjectURL(response.data);
                    setImageArea(true);
                    setImageUrl(url);
                  })
                  .catch((error) => {
                    console.error('이미지 로드 중 오류 발생:', error);
                    setImageUrl(`${process.env.PUBLIC_URL}/images/not-found.png`);
                  });
            }
        }
      }, []);

      const updateBoard = () => {
        if(board){
            switch(board.boardCode){
                case 'I': navi('../infoBoardUpdate'); break;
                case 'E': navi('../eventBoardUpdate'); break;
                case 'N': navi('../notifyBoardUpdate'); break;
            }
        }
    };

    const viewType = (value:string) => {
        switch(value){
            case 'C': return '일반'; 
            case 'S': return '중고'; 
            case 'A': return '입양';
            case 'M': return '실종';
            case 'I': return '정보';
            case 'E': return '이벤트';
            case 'N': return '공지사항';
        }
    } 

    const viewStatus = (value:string) => {
        switch(value){
            case 'Y': return '활성화';
            case 'B': return '비활성화';
            case 'D': return '삭제처리';
        }
    }
    
    return(
        <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    {board && (<>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>게시글 상세 보기</h2>
                            <button className={styles.closeButton} onClick={hideModal}>X</button>
                        </div>
                        <div className={styles.modalBody}>
                            <h2>{board.title}</h2>
                            {
                                imageArea && (<img
                                    src={imageUrl || `${process.env.PUBLIC_URL}/images/upload.png`}
                                    alt="게시글 이미지"
                                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                                    onError={(e) => {
                                    e.currentTarget.src = `${process.env.PUBLIC_URL}/images/upload.png`; // 이미지 로드 실패 시 대체 이미지
                                    }}
                                />)
                            }
                            <div>
                                <th>게시글 타입</th>
                                <td>{viewType(board.boardCode)}</td>
                            </div>
                            <div>
                                <th>작성 회원 고유 ID</th>
                                <td>{board.userNo}</td>
                            </div>
                            <div>
                                <th>작성 게시글 고유 ID</th>
                                <td>{board.boardNo}</td>
                            </div>
                            <div>
                                <th>게시글 상태</th>
                                <td>{viewStatus(board.status)}</td>
                            </div>
                            <div>
                                <th>작성 날짜</th>
                                <td>{board.enrollDate}</td>
                            </div>
                            <div> 
                                <th>수정 날짜</th>
                                <td>{board.modifyDate ? board.modifyDate : '수정 기록 없음'}</td>
                            </div>
                            <div>
                                <th>조회수</th>
                                <td>{board.views}</td>
                            </div>
                            <div>
                                <th>좋아요</th>
                                <td>{board.likes}</td>
                            </div>
                            <div>
                                <th>게시글 내용</th>
                                <td>{board.content}</td>
                            </div>
                        </div>
                        {
                            buttonArea
                            && (<div className={styles.modalFooter}>
                                <button className={styles.cancelButton} onClick={hideModal}>취소</button>
                                <button className={styles.confirmButton} onClick={updateBoard}>수정</button>
                            </div>)
                        }
                       
                    </>)}
                </div>
        </div> 
    )
}