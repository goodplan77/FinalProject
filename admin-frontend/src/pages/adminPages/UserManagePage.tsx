import { useEffect, useState } from 'react';
import styles from './UserManagePage.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { User } from '../../type/User';
import { selectAllUser, selectOneUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

export default function UserManagePage() {

    // state , slice 관리 영역
    const navi = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users);

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filterTerm, setFilterTerm] = useState(''); // 실제 검색에 사용될 필터 상태
    const [itemsPerPage] = useState(10); // 페이지당 항목 수
    const [checkedList, setCheckedList] = useState<User[]>([]);
    const [isAllChecked, setIsAllChecked] = useState(false); // 전체 체크박스 상태

    // 모달 상태 확인용 state 영역
    const [data, setData] = useState<User | null>();

    // 페이지 로딩시 초기 데이터 불러오기 (useEffect)
    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/user/UserList")
            .then((response) => {
                dispatch(selectAllUser(response.data));
            }).catch((response) => {
                console.log(response);
            })
    }, [])

    // 1. 제목 검색 기능
    const handleSearch = () => {
        setFilterTerm(searchTerm); // 검색어를 실제 필터링에 사용될 상태로 설정
        setSearchTerm('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
            setSearchTerm('');
        }
    };

    const filteredBoards = users.filteredUsers.filter(users =>
        users.nickName.toLowerCase().includes(filterTerm.toLowerCase()) // 사용자 닉네임 검색
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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, user: User) => {
        if (e.target.checked) {
            setCheckedList([...checkedList, user]);
        } else {
            setCheckedList(checkedList.filter(check => check.userNo !== user.userNo));
        }
    };

    // ?. 상세보기 페이지 이동
    const moveDetailUser = (e: React.MouseEvent<HTMLDivElement>, user: User) => {
        e.stopPropagation();
        dispatch(selectOneUser(user));
        navi(`../userDetail/${user.userNo}`);
    }

    // 5. 페이지네이션 통합 데이터 확인용 기능
    const totalItems = users.filteredUsers.length;
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
                    onClick={() => {
                        setCurrentPage(i)
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
            <h1 className={styles.title}>회원 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="회원 닉네임 검색"
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
                    <input type="checkbox" className={styles.checkbox}
                        checked={isAllChecked}
                        onChange={checkAllHandler}
                    />
                    <span className={styles.headerItem}>UID</span>
                    <span className={styles.headerItem}>이메일</span>
                    <span className={styles.headerItem}>닉네임</span>
                    <span className={styles.headerItem}>가입일</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>

                {currentItems.map((user, index) => {
                    return (
                        <div key={index} className={styles.memberRow}
                            onClick={(e) => moveDetailUser(e, user)}
                        >
                            <input type="checkbox" className={styles.checkbox}
                                checked={checkedList.some(item => (item.userNo === user.userNo) && (user.status !== 'D'))} // some : 조건을 만족하는 요소 검사 메서드
                                onChange={(e) => handleCheckboxChange(e, user)}
                                disabled={user.status === 'N'}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span className={styles.memberId}>{user.userNo}</span>
                            <span className={styles.memberEmail}>{user.email}</span>
                            <span className={styles.memberNickname}>{user.nickName}</span>
                            <span className={styles.memberJoinDate}>{user.enrollDate}</span>
                            <div className={styles.toggleContainer} onClick={(e) => e.stopPropagation()}>
                                <label className={styles.switch}>
                                    {user.status === 'Y' ? (
                                        <div>
                                            <input type="checkbox" checked={true} />
                                            <span className={styles.slider}></span>
                                        </div>
                                    ) : user.status === 'B' ? (
                                        <div>
                                            <input type="checkbox" checked={false} />
                                            <span className={styles.slider}></span>
                                        </div>
                                    ) : (
                                        <span className={styles.defaultLabel}>삭제됨</span>
                                    )}
                                </label>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>

        </div>
    )
}