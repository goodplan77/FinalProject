import { ReactEventHandler, useEffect, useState } from 'react';
import styles from './styles/NotifyBoardManagePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Board, initialBoardList } from '../../../type/board';
import UpdateModal from '../../../components/UpdateModal';
import DeleteModal from '../../../components/DeleteModal';
import DetailModal from '../../../components/DetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { selectAllBoard, selectOneBoard } from '../../../features/boardSlice';

export default function NotifyBoardManagePage() {
    
    // state , slice 관리 영역
    const navi = useNavigate();
    const dispatch = useDispatch();
    const boards = useSelector((state: RootState) => state.boards);
    
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filterTerm, setFilterTerm] = useState(''); // 실제 검색에 사용될 필터 상태
    const [itemsPerPage] = useState(9); // 페이지당 항목 수
    const [checkedList , setCheckedList] = useState<Board[]>([]);
    const [isAllChecked, setIsAllChecked] = useState(false); // 전체 체크박스 상태

    // 모달 상태 확인용 state 영역
    const [data , setData] = useState<Board|null>();
    const [showUpdateModal , setShowUpdateModal] = useState(false);
    const [showDeleteModal , setShowDeleteModal] = useState(false);
    const [showDetailModal , setShowDetailModal] = useState(false);

    // 페이지 로딩시 초기 데이터 불러오기 (useEffect)
    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/board/NofityboardList")
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
        axios.get("http://localhost:8013/banju/admin/board/NofityboardList")
        .then((response) => {
            dispatch(selectAllBoard(response.data));
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
        axios.get("http://localhost:8013/banju/admin/board/NofityboardList")
        .then((response) => {
            dispatch(selectAllBoard(response.data));
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

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>공지사항 게시글 관리 페이지</h1>
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
            <button className={styles.deleteButton} onClick={setDeleteModal}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" className={styles.checkbox}
                    checked={isAllChecked}
                    onChange={checkAllHandler}
                    />
                    <span className={styles.headerItem}>BID</span>
                    <span className={styles.headerItem}>게시글 제목</span>
                    <span className={styles.headerItem}>작성날짜</span>
                    <span className={styles.headerItem}>수정날짜</span>
                    <span className={styles.headerItem}>조회수</span>
                    <span className={styles.headerItem}>좋아요</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>

                {currentItems.map((board,index) => {return (
                    <div key={index} className={styles.memberRow}
                    onClick={(e) => setDetailModal(e, board)}
                    >
                        <input type="checkbox" className={styles.checkbox} 
                        checked={checkedList.some(item => (item.boardNo === board.boardNo) && (board.status !== 'D'))} // some : 조건을 만족하는 요소 검사 메서드
                        onChange={(e) => handleCheckboxChange(e, board)}
                        disabled = {board.status === 'D'}
                        onClick={(e) => e.stopPropagation()}
                        />
                        <span className={styles.headerItem}>{board.boardNo}</span>
                        <span className={styles.headerItem}>{board.title}</span>
                        <span className={styles.headerItem}>{board.enrollDate}</span>
                        <span className={styles.headerItem}>{board.modifyDate}</span>
                        <span className={styles.headerItem}>{board.views}</span>
                        <span className={styles.headerItem}>{board.likes}</span>
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
            <button className={styles.addButton} onClick={() => navi('/adminPage/notifyBoardInsert')}>추가</button>
        </div>
    )
}
