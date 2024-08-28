import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/AskManagePage.module.css';
import { RootState } from '../../../store/store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ask } from '../../../type/ask';
import { selectAllAsk, selectOneAsk } from '../../../features/askSlice';
import AskDetailModal from '../../../components/AskDetailModal';

export default function InquiryManagePage() {
    // state , slice 관리 영역
    const dispatch = useDispatch();
    const asks = useSelector((state: RootState) => state.asks);
    
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filterTerm, setFilterTerm] = useState(''); // 실제 검색에 사용될 필터 상태
    const [itemsPerPage] = useState(10); // 페이지당 항목 수

     // 모달 상태 확인용 state 영역
     const [data , setData] = useState<ask|null>();
     const [showDetailModal , setShowDetailModal] = useState(false);
  
    // 페이지 로딩시 초기 데이터 불러오기 (useEffect)
    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/ask/askList")
            .then((response) => {
                dispatch(selectAllAsk(response.data));
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

    const filteredBoards = asks.filteredAsks.filter(ask => 
        ask.title.toLowerCase().includes(filterTerm.toLowerCase()) // 제목에 검색어 포함 여부
    );

    // 4. 상세 보기 모달
    const setDetailModal = (e:React.MouseEvent<HTMLDivElement> , ask:ask) => {
        e.stopPropagation();
        const oneAsk = dispatch(selectOneAsk(ask));
        setData((oneAsk.payload));
        setShowDetailModal(true);
    };

    const hideDetailModal = () => {
        setShowDetailModal(false);
    };

    // 5. 페이지네이션 통합 데이터 확인용 기능
    const totalItems = asks.filteredAsks.length;
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
            <h1 className={styles.title}>문의 관리 페이지</h1>
            <div className={styles.searchBar}>
            <input
                    type="text"
                    placeholder="문의 내용 검색"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className={styles.searchButton} onClick={handleSearch}>검색</button>
            </div>

            <div className={styles.postList}>
                <div className={styles.postListHeader}>
                    <span className={styles.headerItem}>AID</span>
                    <span className={styles.headerItem}>작성자</span>
                    <span className={styles.headerItem}>문의 제목</span>
                    <span className={styles.headerItem}>작성 날짜</span>
                    <span className={styles.headerItem}>답변 상태</span>
                </div>
                
                {currentItems.map((ask,index) => {return (
                    <div key={index} className={styles.postRow}
                    onClick={(e) => setDetailModal(e, ask)}
                    >
                        <span className={styles.postId}>{ask.askNo}</span>
                        <span className={styles.postTitle}>{ask.nickName}</span>
                        <span className={styles.postAuthor}>{ask.title}</span>
                        <span className={styles.postCreatedDate}>{ask.askDate}</span>
                        <span className={styles.postModifiedDate}>{ask.status}</span>
                </div>
                )})}
            </div>
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>
            {
                showDetailModal && <AskDetailModal ask={data} hideModal={hideDetailModal}></AskDetailModal>
            }
        </div>
    )
}