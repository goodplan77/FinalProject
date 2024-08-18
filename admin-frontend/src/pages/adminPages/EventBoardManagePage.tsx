import { useEffect, useState } from 'react';
import styles from './EventBoardManage.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Board, initialBoardList } from '../../type/board';

export default function EventBoardManagePage() {
    
    const navi = useNavigate();
    const [boards , setBoards] = useState(initialBoardList);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filterTerm, setFilterTerm] = useState(''); // 실제 검색에 사용될 필터 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [itemsPerPage] = useState(10); // 페이지당 항목 수
    const [checkedList , setCheckedList] = useState<Board[]>([]);
    const [isAllChecked, setIsAllChecked] = useState(false); // 전체 체크박스 상태

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, board: Board) => {
        if (e.target.checked) {
            setCheckedList([...checkedList, board]);
        } else {
            setCheckedList(checkedList.filter(check => check.boardNo !== board.boardNo));
        }
    };
    const checkAllHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsAllChecked(checked);

        if (checked) {
            // 모든 항목을 체크
            setCheckedList(currentItems);
        } else {
            // 모든 항목 체크 해제
            setCheckedList([]);
        }
    }

    const deleteCheckList = () => {
        if(checkedList.length > 0){
            let message = "다음 게시물 데이터를 지우시겠습니까?\n"
            
            for(let item of checkedList){
            let data = "";
            data += "게시물 번호 : " + item.boardNo + " , ";
            data += "게시물 제목 : " + item.title + " , ";
            data += "작성날짜 : " + item.enrollDate + "\n";
            message += data;
        }
            alert(message);
        } else {
            alert("선택된 게시물이 없습니다.");
        }
        
    }

    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/board/EventboardList")
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
            <h1 className={styles.title}>이벤트 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="이벤트 게시글 제목 검색"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className={styles.searchButton} onClick={handleSearch}>검색</button>
            </div>
            <button className={styles.deleteButton} onClick={deleteCheckList}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" className={styles.checkbox}
                    checked={isAllChecked}
                    onChange={checkAllHandler}
                    />
                    <span className={styles.headerItem}>UID</span>
                    <span className={styles.headerItem}>게시글 제목</span>
                    <span className={styles.headerItem}>작성날짜</span>
                    <span className={styles.headerItem}>수정날짜</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>

                {currentItems.map((board,index) => {return (
                    <div key={index} className={styles.memberRow}>
                        <input type="checkbox" className={styles.checkbox} 
                        checked={checkedList.some(item => item.boardNo === board.boardNo)} // some : 조건을 만족하는 요소 검사 메서드
                        onChange={(e) => handleCheckboxChange(e, board)}
                        />
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
            <button className={styles.addButton} onClick={() => navi('/adminPage/eventBoardInsert')}>추가</button>
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>

            {/* 모달 */}
            {/* <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>게시글 삭제 알림</h2>
                        <button className={styles.closeButton}>X</button>
                    </div>
                    <div className={styles.modalBody}>
                        해당 하는 게시글이 삭제 됩니다. 정말로 지우시겠습니까?
                        <br />
                        UID : 0001, 관리자가 쏜다!!!!
                    </div>
                    <div className={styles.modalFooter}>
                        <button className={styles.cancelButton}>취소</button>
                        <button className={styles.confirmButton}>삭제</button>
                    </div>
                </div>
            </div> */}
        </div>
    );
};