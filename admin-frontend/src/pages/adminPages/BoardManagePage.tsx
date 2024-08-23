import { useEffect, useState } from 'react';
import styles from './BoardManagePage.module.css';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectAllBoard, selectCategoryBoard, selectOneBoard } from '../../features/boardSlice';
import { Board } from '../../type/board';
import UpdateModal from '../../components/UpdateModal';
import DeleteModal from '../../components/DeleteModal';
import DetailModal from '../../components/DetailModal';

export default function BoardManagePage() {
    
    // state , slice 관리 영역
    const dispatch = useDispatch();
    const boards = useSelector((state: RootState) => state.boards);
    
    const [activeCategory, setActiveCategory] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filterTerm, setFilterTerm] = useState(''); // 실제 검색에 사용될 필터 상태
    const [itemsPerPage] = useState(10); // 페이지당 항목 수
    const [checkedList , setCheckedList] = useState<Board[]>([]);
    const [isAllChecked, setIsAllChecked] = useState(false); // 전체 체크박스 상태

    // 모달 상태 확인용 state 영역
    const [data , setData] = useState<Board|null>();
    const [showUpdateModal , setShowUpdateModal] = useState(false);
    const [showDeleteModal , setShowDeleteModal] = useState(false);
    const [showDetailModal , setShowDetailModal] = useState(false);

    // 페이지 로딩시 초기 데이터 불러오기 (useEffect)
    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/board/UserboardList")
            .then((response) => {
                dispatch(selectAllBoard(response.data));
            }).catch((response) => {
                console.log(response);
            })
    }, [])

    // 1. 제목 검색 기능
    const handleSearch = () => {
        setFilterTerm(searchTerm); // 검색어를 실제 필터링에 사용될 상태로 설정
        setSearchTerm('');
    };

    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
            setSearchTerm('');
        }
    };

    const filteredBoards = boards.filteredBoards.filter(board => 
        board.title.toLowerCase().includes(filterTerm.toLowerCase()) // 제목에 검색어 포함 여부
    );

    // 2. 카테고리 선택 기능
    const handleCategoryClick = (category: any) => {
        setActiveCategory(category);
        // 카테고리 변경에 따른 로직을 추가할 수 있습니다.
        dispatch(selectCategoryBoard(category));
        setSearchTerm('');
        setFilterTerm('');
        setIsAllChecked(false);
        setCheckedList([]);
        setCurrentPage(1);
    };

    const categoryConvert = (type:string) =>{ 
        switch(type){
            case 'C': return '일반';
            case 'S': return '중고';
            case 'A': return '분양';
            case 'M': return '실종';
        }
    };

    // 2-1. 삭제 기능 관련 , 체크 박스 선택
    const checkAllHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsAllChecked(checked);

        if (checked) {
            // 모든 항목을 체크
            setCheckedList(currentItems.filter(item => item.status !== 'D'));
        } else {
            // 모든 항목 체크 해제
            setCheckedList([]);
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, board: Board) => {
        if (e.target.checked) {
            setCheckedList([...checkedList, board]);
        } else {
            setCheckedList(checkedList.filter(check => check.boardNo !== board.boardNo));
        }
    };

    // 2-2. 삭제 모달
    const setDeleteModal = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(checkedList.length>0){
            setShowDeleteModal(true);
        } else {
            alert("게시물을 선택 해주세요.")
        }
    }

    const hideDeleteModal = () => {
        setCheckedList([]);
        setShowDeleteModal(false);
        axios.get("http://localhost:8013/banju/admin/board/UserboardList")
        .then((response) => {
            dispatch(selectAllBoard(response.data)); // 삭제 후 목록을 다시 불러옴
        }).catch((response) => {
            console.log(response);
        });
    };

    // 3. 활성화 관련 토글 선택시 모달 추가
    const setUpdateModal = (e:React.ChangeEvent<HTMLDivElement> , board:Board) => {
        const oneBoard = dispatch(selectOneBoard(board));
        setData((oneBoard.payload));
        setShowUpdateModal(true);
    };

    const hideUpdateModal = () => {
        setCheckedList([]);
        setShowUpdateModal(false);
        axios.get("http://localhost:8013/banju/admin/board/UserboardList")
        .then((response) => {
            dispatch(selectAllBoard(response.data)); // 삭제 후 목록을 다시 불러옴
        }).catch((response) => {
            console.log(response);
        });
    };

    // 4. 상세 보기 모달
    const setDetailModal = (e:React.MouseEvent<HTMLDivElement> , board:Board) => {
        e.stopPropagation();
        const oneBoard = dispatch(selectOneBoard(board));
        setData((oneBoard.payload));
        setShowDetailModal(true);
    };

    const hideDetailModal = () => {
        setShowDetailModal(false);
    };

    // 5. 페이지네이션 통합 데이터 확인용 기능
    const totalItems = boards.filteredBoards.length;
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
                    onClick={() => {setCurrentPage(i)
                        setIsAllChecked(false);
                        setCheckedList([]);
                    }}
                >
                    {i}
                </span>
            );
        }
        return pageNumbers;
    };
    
    // 6. 실제 html 요소 반환 부분
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>게시글 관리 페이지</h1>
            <div className={styles.searchBar}>
            <input
                    type="text"
                    placeholder="회원용 게시글 제목 검색"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className={styles.searchButton} onClick={handleSearch}>검색</button>
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
                    className={`${styles.categoryButton} ${activeCategory === '실종' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('실종')}
                >
                    실종
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '분양' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('분양')}
                >
                    분양
                </button>
            </div>
            <button className={styles.deleteButton} onClick={setDeleteModal}>삭제</button>
            <div className={styles.postList}>
                <div className={styles.postListHeader}>
                    <input type="checkbox" className={styles.checkbox}
                    checked={isAllChecked}
                    onChange={checkAllHandler}
                    />
                    <span className={styles.headerItem}>BID</span>
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
                    <div key={index} className={styles.postRow}
                    onClick={(e) => setDetailModal(e, board)}
                    >
                        <input type="checkbox" className={styles.checkbox} 
                        checked={checkedList.some(item => (item.boardNo === board.boardNo) && (board.status !== 'D'))} // some : 조건을 만족하는 요소 검사 메서드
                        onChange={(e) => handleCheckboxChange(e, board)}
                        disabled = {board.status === 'D'}
                        onClick={(e) => e.stopPropagation()}
                        />
                        <span className={styles.postId}>{board.boardNo}</span>
                        <span className={styles.postTitle}>{board.title}</span>
                        <span className={styles.postCategory}>{categoryConvert(`${board.boardCode}`)}</span>
                        <span className={styles.postAuthor}>{board.nickName}</span>
                        <span className={styles.postCreatedDate}>{board.enrollDate}</span>
                        <span className={styles.postModifiedDate}>{board.modifyDate}</span>
                        <span className={styles.postViews}>{board.views}</span>
                        <span className={styles.postLikes}>{board.likes}</span>
                        <span className={styles.postReports}>0</span>
                        <div className={styles.toggleContainer} onClick={(e) => e.stopPropagation()}>
                        <label className={styles.switch}>
                                    {board.status === 'Y' ? (
                                    <div>
                                        <input type="checkbox" checked={true} onChange={(e) => {e.stopPropagation(); setUpdateModal(e, board);}}/>
                                        <span className={styles.slider}></span>
                                    </div>
                                ) : board.status === 'B' ? (
                                    <div>
                                        <input type="checkbox" checked={false} onChange={(e) => {e.stopPropagation(); setUpdateModal(e, board);}}/>
                                        <span className={styles.slider}></span>
                                    </div>
                                ) : (
                                    <span className={styles.defaultLabel}>삭제됨</span>
                                )}
                        </label>
                    </div>
                </div>
                )})}
            </div>
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>
            {
                showUpdateModal && <UpdateModal board={data} hideModal={hideUpdateModal}></UpdateModal>
            }
            {
                showDeleteModal && <DeleteModal boards={checkedList} hideModal={hideDeleteModal}></DeleteModal>
            }
            {
                showDetailModal && <DetailModal board={data} hideModal={hideDetailModal}></DetailModal>
            }
        </div>
    )
}