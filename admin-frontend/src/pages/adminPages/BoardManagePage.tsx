import { useEffect, useState } from 'react';
import styles from './BoardManagePage.module.css';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectAllBoard, selectCategoryBoard } from '../../features/boardSlice';
import { initialBoard } from '../../type/board';

export default function BoardManagePage() {
    const [activeCategory, setActiveCategory] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [itemsPerPage] = useState(10); // 페이지당 항목 수

    const handleCategoryClick = (category: any) => {
        setActiveCategory(category);
        // 카테고리 변경에 따른 로직을 추가할 수 있습니다.
        dispatch(selectCategoryBoard(category));
        setCurrentPage(1);
    };

    const categoryConvert = (type:string) =>{ 
        switch(type){
            case 'C': return '일반';
            case 'S': return '중고';
            case 'M': return '분양';
            case 'A': return '실종';
        }
    };

    const dispatch = useDispatch();

    const boards = useSelector((state: RootState) => state.boards);

    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/board/UserboardList")
            .then((response) => {
                console.log(response);
                dispatch(selectAllBoard(response.data));
            }).catch((response) => {
                console.log(response);
            })
    }, [])

    const totalItems = boards.filteredBoards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = Math.max(0, indexOfLastItem - itemsPerPage);
    const currentItems = boards.filteredBoards.slice(indexOfFirstItem, Math.min(indexOfLastItem, totalItems));

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <span
                    key={i}
                    className={`${styles.page} ${currentPage === i ? styles.activePage : ''}`}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </span>
            );
        }
        return pageNumbers;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>게시글 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="게시글 제목 검색"
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.categoryBar}>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '전체' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('전체')}
                >
                    전체
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '일반' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('일반')}
                >
                    일반
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '중고' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('중고')}
                >
                    중고
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '분양' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('분양')}
                >
                    분양
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '실종' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('실종')}
                >
                    실종
                </button>
            </div>
            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.postList}>
                <div className={styles.postListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.headerItem}>UID</span>
                    <span className={styles.headerItem}>게시글 제목</span>
                    <span className={styles.headerItem}>분류</span>
                    <span className={styles.headerItem}>작성자</span>
                    <span className={styles.headerItem}>작성 날짜</span>
                    <span className={styles.headerItem}>수정 날짜</span>
                    <span className={styles.headerItem}>조회수</span>
                    <span className={styles.headerItem}>좋아요</span>
                    <span className={styles.headerItem}>신고</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>
                
                {currentItems.map((board,index) => {return (
                    <div key={index} className={styles.postRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.postId}>{board.boardNo}</span>
                        <span className={styles.postTitle}>{board.title}</span>
                        <span className={styles.postCategory}>{categoryConvert(`${board.boardCode}`)}</span>
                        <span className={styles.postAuthor}>{board.userNo}</span>
                        <span className={styles.postCreatedDate}>{board.enrollDate}</span>
                        <span className={styles.postModifiedDate}>{board.modifyDate}</span>
                        <span className={styles.postViews}>{board.views}</span>
                        <span className={styles.postLikes}>{board.likes}</span>
                        <span className={styles.postReports}>0</span>
                        <div className={styles.toggleContainer}>
                        <div className={styles.toggle}></div>
                    </div>
                </div>
                )})}
            </div>
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>
        </div>
    )
}