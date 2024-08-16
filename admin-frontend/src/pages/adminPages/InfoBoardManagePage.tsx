import { useNavigate } from 'react-router-dom';
import styles from './InfoBoardManagePage.module.css';
import { useEffect, useState } from 'react';
import { initialBoardList } from '../../type/board';
import axios from 'axios';

export default function InfoBoardManagePage() {

    const navi = useNavigate();
    const [boards , setBoards] = useState(initialBoardList);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filterTerm, setFilterTerm] = useState(''); // 실제 검색에 사용될 필터 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [itemsPerPage] = useState(10); // 페이지당 항목 수

    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/board/InfoboardList")
            .then((response) => {
                console.log(response);
                setBoards(response.data);
            }).catch((response) => {
                console.log(response);
            })
    }, [])

    const handleSearch = () => {
        setFilterTerm(searchTerm); // 검색어를 실제 필터링에 사용될 상태로 설정
    };

    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const filteredBoards = boards.filter(board => 
        board.title.toLowerCase().includes(filterTerm.toLowerCase()) // 제목에 검색어 포함 여부
    );

    const totalItems = boards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = Math.max(0, indexOfLastItem - itemsPerPage);
    const currentItems = filteredBoards.slice(indexOfFirstItem, Math.min(indexOfLastItem, totalItems));

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
            <h1 className={styles.title}>정보 게시글 관리 페이지</h1>
            <div className={styles.searchBar}>
            <input
                    type="text"
                    placeholder="정보 게시글 제목 검색"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className={styles.searchButton} onClick={handleSearch}>검색</button>
            </div>
            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.headerItem}>UID</span>
                    <span className={styles.headerItem}>게시글 제목</span>
                    <span className={styles.headerItem}>작성날짜</span>
                    <span className={styles.headerItem}>수정날짜</span>
                    <span className={styles.headerItem}>조회수</span>
                    <span className={styles.headerItem}>좋아요</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>

                {currentItems.map((board,index) => {return (
                    <div key={index} className={styles.memberRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.headerItem}>{board.boardNo}</span>
                        <span className={styles.headerItem}>{board.title}</span>
                        <span className={styles.headerItem}>{board.enrollDate}</span>
                        <span className={styles.headerItem}>{board.modifyDate}</span>
                        <span className={styles.headerItem}>{board.views}</span>
                        <span className={styles.headerItem}>{board.likes}</span>
                        <div className={styles.toggleContainer}>
                        <div className={styles.toggle}></div>
                    </div>
                </div>
                )})}

            </div>
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>
            <button className={styles.addButton} onClick={() => navi('/adminPage/infoBoardInsert')}>추가</button>
        </div>
    )
}