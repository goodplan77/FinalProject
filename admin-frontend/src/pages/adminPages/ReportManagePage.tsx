import { useDispatch, useSelector } from 'react-redux';
import styles from './ReportManagePage.module.css';
import { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { report } from '../../type/report';
import axios from 'axios';
import { selectAllReport, selectCategory, selectOneReport, selectReportType } from '../../features/reportSlice';
import DetailReportModal from '../../components/DetailReportModal';

export default function ReportManagePage() {

    // state , slice 관리 영역
    const dispatch = useDispatch();
    const reports = useSelector((state: RootState) => state.reports);
    
    const [activeCategory, setActiveCategory] = useState('전체');
    const [activeType, setActiveType] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filterTerm, setFilterTerm] = useState(''); // 실제 검색에 사용될 필터 상태
    const [itemsPerPage] = useState(10); // 페이지당 항목 수

     // 모달 상태 확인용 state 영역
     const [data , setData] = useState<report|null>();
     const [showDetailModal , setShowDetailModal] = useState(false);
  
    // 페이지 로딩시 초기 데이터 불러오기 (useEffect)
    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/report/reportList")
            .then((response) => {
                console.log(response.data);
                dispatch(selectAllReport(response.data));
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

    // 2. 카테고리 선택 기능
    const handleCategoryClick = (category: any) => {
        setActiveCategory(category);
        // 카테고리 변경에 따른 로직을 추가할 수 있습니다.
        dispatch(selectCategory(category));
        setSearchTerm('');
        setFilterTerm('');
        setCurrentPage(1);
    };

    const handleTypeClick = (type: any) => {
        setActiveType(type);
        // 카테고리 변경에 따른 로직을 추가할 수 있습니다.
        dispatch(selectReportType(type));
        setSearchTerm('');
        setFilterTerm('');
        setCurrentPage(1);
    };

    const filteredBoards = reports.filteredReports.filter(report => 
        report.content.toLowerCase().includes(filterTerm.toLowerCase()) // 제목에 검색어 포함 여부
    );

    // 4. 상세 보기 모달
    const setDetailModal = (e:React.MouseEvent<HTMLDivElement> , report:report) => {
        e.stopPropagation();
        const onereport = dispatch(selectOneReport(report));
        setData((onereport.payload));
        setShowDetailModal(true);
    };

    const hideDetailModal = () => {
        setShowDetailModal(false);
    };

    // 5. 페이지네이션 통합 데이터 확인용 기능
    const totalItems = reports.filteredReports.length;
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

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>신고 관리 페이지</h1>
            <div className={styles.searchBar}>
            <input
                    type="text"
                    placeholder="신고 사유 검색"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className={styles.searchButton} onClick={handleSearch}>검색</button>
            </div>
            <div className={styles.categoryButtons}>
            <button
                    className={`${styles.categoryButton} ${activeType === '전체' ? styles.active : ''}`}
                    onClick={() => handleTypeClick('전체')}
                >
                    전체
                </button>
                <button
                    className={`${styles.categoryButton} ${activeType === 'U' ? styles.active : ''}`}
                    onClick={() => handleTypeClick('U')}
                >
                    사용자
                </button>
                <button
                    className={`${styles.categoryButton} ${activeType === 'B' ? styles.active : ''}`}
                    onClick={() => handleTypeClick('B')}
                >
                    게시글
                </button>
                <button
                    className={`${styles.categoryButton} ${activeType === 'C' ? styles.active : ''}`}
                    onClick={() => handleTypeClick('C')}
                >
                    댓글
                </button>
            </div>
            <div className={styles.categoryButtons}>
            <button
                    className={`${styles.categoryButton} ${activeCategory === '전체' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('전체')}
                >
                    전체
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '욕설' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('욕설')}
                >
                    욕설
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '음란' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('음란')}
                >
                    음란
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '광고' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('광고')}
                >
                    광고
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '부적절' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('부적절')}
                >
                    부적절
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '기타' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('기타')}
                >
                    기타
                </button>
            </div>
            <div className={styles.memberList}>
                <div className={styles.postListHeader}>
                    <span className={styles.headerItem}>RID</span>
                    <span className={styles.headerItem}>카테고리</span>
                    <span className={styles.headerItem}>작성자</span>
                    <span className={styles.headerItem}>신고 사유</span>
                    <span className={styles.headerItem}>대상 분류</span>
                    <span className={styles.headerItem}>작성 날짜</span>
                </div>
                {currentItems.map((report,index) => {return (
                    <div key={index} className={styles.postRow}
                    onClick={(e) => setDetailModal(e, report)}
                    >
                        <span className={styles.postId}>{report.reportNo}</span>
                        <span className={styles.postTitle}>{report.category}</span>
                        <span className={styles.postAuthor}>{report.nickName}</span>
                        <span className={styles.postCreatedDate}>{report.content}</span>
                        <span className={styles.postModifiedDate}>{report.typeCode}</span>
                        <span className={styles.postModifiedDate}>{report.reportDate}</span>
                </div>
                )})}
            </div>
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>
            {
                showDetailModal && <DetailReportModal report={data} hideModal={hideDetailModal}></DetailReportModal>
            }
        </div>
    )
}