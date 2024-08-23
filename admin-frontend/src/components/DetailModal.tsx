import axios from "axios";
import { Board } from "../type/board";
import styles from "./css/DetailModal.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DetailModal({ board, hideModal }: { board: Board | undefined | null, hideModal: () => void }) {

    const navi = useNavigate();

    const [imageUrls, setImageUrls] = useState<string[] | null>([]);
    const [buttonArea, setButtonArea] = useState(false);
    const [imageArea, setImageArea] = useState(false);

    useEffect(() => {
        if (board) {
            let apiRequestURL = "";
            switch (board.boardCode) {
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
                default:
                    alert("게시판 타입을 불러오는데 실패했습니다.");
            }

            if (apiRequestURL.length > 0) {
                axios.get(apiRequestURL)
                    .then((response) => {
                        console.log(response);
                        setImageArea(true);
                        setImageUrls([...response.data.imageList]);
                    })
                    .catch((error) => {
                        console.error('이미지 로드 중 오류 발생:', error);
                        setImageUrls([`${process.env.PUBLIC_URL}/images/not-found.png`]);
                    });
            }
        }
    }, [board]);

    const updateBoard = () => {
        if (board) {
            switch (board.boardCode) {
                case 'I': navi('../infoBoardUpdate'); break;
                case 'E': navi('../eventBoardUpdate'); break;
                case 'N': navi('../notifyBoardUpdate'); break;
            }
        }
    };

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

    const viewStatus = (value: string) => {
        switch (value) {
            case 'Y': return '활성화';
            case 'B': return '비활성화';
            case 'D': return '삭제처리';
        }
    }

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                {board && (<>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>{board.title}</h2>
                        <p className={styles.dateInfo}>작성: {board.enrollDate} / 수정: {board.modifyDate ? board.modifyDate : '수정 기록 없음'}</p>
                        <button className={styles.closeButton} onClick={hideModal}>X</button>
                    </div>
                    <div className={styles.modalBody}>
                        <p>{board.content}</p>
                        {imageArea && imageUrls && (
                            imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8013/banju${url}`}
                                    alt={`게시글 이미지 ${index + 1}`}
                                    style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px' }}
                                    onError={(e) => {
                                        e.currentTarget.src = `${process.env.PUBLIC_URL}/images/upload.png`;
                                    }}
                                />
                            ))
                        )}
                    </div>
                    <div className={styles.modalFooter}>
                        <div className={styles.footerItem}>
                            <span className={styles.icon}>👁️</span> {board.views}
                        </div>
                        <div className={styles.footerItem}>
                            <span className={styles.icon}>❤️</span> {board.likes}
                        </div>
                        {buttonArea && (
                            <div className={styles.buttonGroup}>
                                <button className={styles.modifyButton} onClick={updateBoard}>수정</button>
                                <button className={styles.deleteButton} onClick={() => alert('삭제 기능은 구현되지 않았습니다.')}>삭제</button>
                            </div>
                        )}
                    </div>
                </>)}
            </div>
        </div>
    );
}
