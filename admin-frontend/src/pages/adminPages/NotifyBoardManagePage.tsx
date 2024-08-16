import { useEffect, useState } from 'react';
import styles from './NotifyBoardManagePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { initialBoardList } from '../../type/board';

export default function NotifyBoardManagePage() {
    
    const navi = useNavigate();
    const [boards , setBoards] = useState(initialBoardList);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filterTerm, setFilterTerm] = useState(''); // 실제 검색에 사용될 필터 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [itemsPerPage] = useState(10); // 페이지당 항목 수

    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/board/NofityboardList")
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
            <h1 className={styles.title}>공지사항 관리 페이지</h1>
            <div className={styles.searchBar}>
            <input
                    type="text"
                    placeholder="공지사항 게시글 제목 검색"
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
                    <span>UID</span>
                    <span>게시글 제목</span>
                    <span>작성날짜</span>
                    <span>수정날짜</span>
                    <span>활성화</span>
                </div>

                {currentItems.map((board,index) => {return (
                    <div key={index} className={styles.memberRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.memberId}>{board.boardNo}</span>
                        <span className={styles.memberEmail}>{board.title}</span>
                        <span className={styles.memberJoinDate}>{board.enrollDate}</span>
                        <span className={styles.memberJoinDate}>{board.modifyDate}</span>
                        <div className={styles.toggleContainer}>
                        <div className={styles.toggle}></div>
                    </div>
                </div>
                )})}
                
            </div>
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>
            <div className={styles.addButton} onClick={() => navi('/adminPage/notifyBoardInsert')}>+</div>
        </div>
    )
}
