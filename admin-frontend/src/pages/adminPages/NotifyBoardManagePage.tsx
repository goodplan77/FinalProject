import { useEffect, useState } from 'react';
import styles from './NotifyBoardManagePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { initialBoardList } from '../../type/board';

export default function NotifyBoardManagePage() {
    const navi = useNavigate();
    const [boards , setBoards] = useState(initialBoardList);

    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/board/NofityboardList")
            .then((response) => {
                console.log(response);
                setBoards(response.data);
            }).catch((response) => {
                console.log(response);
            })
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>공지사항 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="게시글 정보 검색"
                    className={styles.searchInput}
                />
            </div>

            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>UID</span>
                    <span>게시글 제목</span>
                    <span>작성날짜</span>
                    <span>수정날짜</span>
                    <span>활성화</span>
                </div>

                {boards.map((board,index) => {return (
                    <div key={index} className={styles.postRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.postId}>{board.boardNo}</span>
                        <span className={styles.postTitle}>{board.title}</span>
                        <span className={styles.postCreatedDate}>{board.enrollDate}</span>
                        <span className={styles.postModifiedDate}>{board.modifyDate}</span>
                        <div className={styles.toggleContainer}>
                        <div className={styles.toggle}></div>
                    </div>
                </div>
                )})}
                
            </div>
            <div className={styles.pagination}>
                <span className={styles.page}>1</span>
                <span className={styles.page}>2</span>
                <span className={styles.page}>3</span>
                <span className={styles.pageGap}>...</span>
                <span className={styles.page}>67</span>
                <span className={styles.page}>68</span>
            </div>
            <div className={styles.addButton} onClick={() => navi('/adminPage/notifyBoardInsert')}>+</div>
        </div>
    )
}
