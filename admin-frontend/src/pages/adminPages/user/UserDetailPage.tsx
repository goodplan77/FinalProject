import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/UserDetailPage.module.css';
import { RootState } from '../../../store/store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Board, Comment } from '../../../type/board';
import { report } from '../../../type/report';
import { Dog } from '../../../type/dog';
import DetailModal from '../../../components/DetailModal';

type CategoryData = Board[] | Comment[] | report[];

export default function UserDetailPage() {

    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users);
    const [user, setUser] = useState(users.oneUser);
    const [userImg , setUserImg] = useState('');
    const [dogImgUrl, setDogImgUrl] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('게시글'); // 선택된 카테고리 상태 추가
    const [categoryData, setCategoryData] = useState<CategoryData>([]); // 선택된 카테고리의 데이터 상태

    const [data , setData] = useState<Board|null>();
    const [showDetailModal , setShowDetailModal] = useState(false);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try{
                const response = await axios.get(`http://localhost:8013/banju/admin/user/UserDetail/${user.userNo}`)
                setUser(response.data.user);

                if(response.data.user){
                    const secondResponse = await axios.get(`http://localhost:8013/banju/api/user/${user.userNo}`);
                    console.log(secondResponse);
                    setUserImg(secondResponse.data);
                }

                if(response.data.user){
                    const thirdResponse = await axios.get<Board[]>(`http://localhost:8013/banju/board/postedList/${user.userNo}`)
                    console.log(thirdResponse);
                    setCategoryData(thirdResponse.data);
                }

                if(response.data.user.dogs){
                    const fourResponse = await axios.get(`http://localhost:8013/banju/api/user/dog/${user.userNo}`);
                    console.log(fourResponse);
                    setDogImgUrl(fourResponse.data.imageList);
                }
 
            } catch (error) {
                console.error('에러가 발생했습니다.', error);
            }
        }
       
        fetchUserDetail();
    }, []);

    const selectUserBoard = () => {
        setSelectedCategory('게시글');
        axios.get<Board[]>(`http://localhost:8013/banju/board/postedList/${user.userNo}`)
            .then((response) => {
                setCategoryData(response.data); // 데이터를 상태에 저장
                console.log(response);
            });
    };

    const selectUserComment = () => {
        setSelectedCategory('댓글');
        axios.get<Comment[]>(`http://localhost:8013/banju/admin/board/comment/${user.userNo}`)
            .then((response) => {
                setCategoryData(response.data); // 데이터를 상태에 저장
                console.log(response);
            });
    };

    const selectUserReport = () => {
        setSelectedCategory('신고');
        axios.get<report[]>(`http://localhost:8013/banju/admin/report/userReportList/${user.userNo}`)
            .then((response) => {
                setCategoryData(response.data); // 데이터를 상태에 저장
                console.log(response);
            });
    };

    // 4. 상세 보기 모달
    const setDetailModal = (e:React.MouseEvent<HTMLDivElement> , board:Board) => {
        e.stopPropagation();
        setData(board);
        setShowDetailModal(true);
    };

    const hideDetailModal = () => {
        setShowDetailModal(false);
    };

    const categoryConvert = (type:string) =>{ 
        switch(type){
            case 'C': return '일반';
            case 'S': return '중고';
            case 'A': return '분양';
            case 'M': return '실종';
        }
    };

    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.profileContainer}>
                <div className={styles.profileImage}>
                    <img src={`http://localhost:8013/banju${userImg}`} alt="프로필 이미지" />
                </div>
                <div className={styles.profileText}>{user.nickName}</div>
                <div className={styles.profileValue}>UID : {user.userNo}</div>
                <div className={styles.profileValue}>e-mail : {user.email}</div>
                <div className={styles.profileValue}>phone : {user.phone}</div>
                <div className={styles.profileValue}>상태 : {user.status}</div>
                <div className={styles.profileValue}>주소 : {user.address}</div>

                <div className={styles.infoEditContainer}>
                    <div className={styles.infoEditHeader}>정보 수정</div>
                    <div className={styles.infoEditItem}>
                        <div className={styles.infoEditLabel}>닉네임</div>
                        <div className={styles.infoEditValue}>{user.nickName}</div>
                    </div>
                    <div className={styles.infoEditItem}>
                        <div className={styles.infoEditLabel}>E-mail</div>
                        <div className={styles.infoEditValue}>{user.email}</div>
                    </div>
                    <div className={styles.infoEditItem}>
                        <div className={styles.infoEditLabel}>연락처</div>
                        <div className={styles.infoEditValue}>{user.phone}</div>
                    </div>
                    <div className={styles.infoEditItem}>
                        <div className={styles.infoEditLabel}>상태</div>
                        <div className={styles.infoEditValue}>{user.status}</div>
                    </div>
                    <div className={styles.infoEditItem}>
                        <div className={styles.infoEditLabel}>활성화 상태</div>
                        <div className={styles.infoEditToggle}>
                            <input type="checkbox" checked />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.dogInfoContainer}>
                    <div className={styles.dogInfoHeader}>반려견 정보 수정</div>
                    <div className={styles.dogInfoBox}>
                        <span className={styles.dogInfoText}>대표유무</span>
                        <span className={styles.dogInfoText}>사진</span>
                        <span className={styles.dogInfoText}>이름</span>
                        <span className={styles.dogInfoText}>강아지 종</span>
                        <span className={styles.dogInfoText}>성별</span>
                        <span className={styles.dogInfoText}>생년월일</span>
                    </div>
                    {user.dogs?.map((dog, index) => (
                        <div key={index} className={styles.dogInfoBox}>
                            <span className={styles.dogInfoText}>{dog.isMain ? '대표' : ''}</span>
                            <div className={styles.dogInfoImage}>
                                <img src={`http://localhost:8013/banju${dogImgUrl[index]}`} alt="" />
                            </div>
                            <span className={styles.dogInfoText}>{dog.dogName}</span>
                            <span className={styles.dogInfoText}>{dog.breed}</span>
                            <span className={styles.dogInfoText}>{dog.gender}</span>
                            <span className={styles.dogInfoText}>{dog.birthday.substring(2,10)}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.pointInfoContainer}>
                    <div className={styles.pointInfoHeader}>회원 포인트 관리</div>
                    <div className={styles.pointInfoList}>
                        <div className={styles.pointInfoBox}>
                            <span className={styles.pointInfoText}>사용 포인트</span>
                            <span className={styles.pointInfoText}>내용</span>
                            <span className={styles.pointInfoText}>변동 날짜</span>
                        </div>
                        <div className={styles.pointInfoBoxScllor}>
                            {
                                user.historyList?.map((item, index) => (
                                    <div key={index} className={styles.pointInfoBox}>
                                        <span className={styles.pointInfoText}>{item.point}</span>
                                        <span className={styles.pointInfoText}>{item.content}</span>
                                        <span className={styles.pointInfoText}>{item.pointDate}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.userAction}>
                <div className={styles.userActionContent}>
                    <div className={styles.activityList}>활동 목록</div>
                    <div className={styles.recentActivity}>최근 로그인: {user.lastLoginDate}</div>
                    <div className={styles.category}>
                        <div className={styles.usedCategory}>
                            <div className={`${styles.categoryRect} ${selectedCategory === '게시글' ? styles.active : ''}`}>
                                <div className={styles.categoryText} onClick={selectUserBoard}>게시글</div>
                            </div>
                            <div className={`${styles.categoryRect} ${selectedCategory === '댓글' ? styles.active : ''}`}>
                                <div className={styles.categoryText} onClick={selectUserComment}>댓글</div>
                            </div>
                            <div className={`${styles.categoryRect} ${selectedCategory === '신고' ? styles.active : ''}`}>
                                <div className={styles.categoryText} onClick={selectUserReport}>신고</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.categoryContent}>
                    {/* 선택된 카테고리에 따라 데이터를 렌더링 */}
                    {selectedCategory === '게시글' && (
                        <div className={styles.categoryBoard}>
                            <div className={styles.headerItem}>
                                <div className={styles.categoryData}>타입</div>
                                <div className={styles.categoryData}>BID</div>
                                <div className={styles.categoryData}>제목</div>
                                <div className={styles.categoryData}>작성일</div>
                                <div className={styles.categoryData}>상태</div>
                            </div>
                            {/* 게시글 데이터 렌더링 */}
                            {(categoryData as Board[]).map((item, index) => (
                                <div key={index} className={styles.dataItem} onClick={(e) => setDetailModal(e, item)}>
                                    <div className={styles.categoryData}>{categoryConvert(item.boardCode)}</div>
                                    <div className={styles.categoryData}>{item.boardNo}</div>
                                    <div className={styles.categoryDataTitle}>{item.title}</div>
                                    <div className={styles.categoryData}>{item.enrollDate}</div>
                                    <div className={styles.categoryData}>{item.status}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedCategory === '댓글' && (
                        <div className={styles.categoryComment}>
                            <div className={styles.headerItem}>
                                <div className={styles.categoryData}>CID</div>
                                <div className={styles.categoryData}>BID</div>
                                <div className={styles.categoryData}>내용</div>
                                <div className={styles.categoryData}>상태</div>
                                <div className={styles.categoryData}>원댓글ID</div>
                            </div>
                            {/* 댓글 데이터 렌더링 */}
                            {(categoryData as Comment[]).map((item, index) => (
                                <div key={index} className={styles.dataItem}>
                                    <div className={styles.categoryData}>{item.commentNo}</div>
                                    <div className={styles.categoryData}>{item.boardNo}</div>
                                    <div className={styles.categoryDataTitle}>{item.content}</div>
                                    <div className={styles.categoryData}>{item.status}</div>
                                    <div className={styles.categoryData}>{item.refNo}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedCategory === '신고' && (
                        <div className={styles.categoryReport}>
                            <div className={styles.headerItem}>
                                <div className={styles.categoryData}>RID</div>
                                <div className={styles.categoryData}>타입</div>
                                <div className={styles.categoryData}>신고일</div>
                                <div className={styles.categoryData}>신고타입</div>
                                <div className={styles.categoryData}>참조ID</div>
                            </div>
                            {/* 신고 데이터 렌더링 */}
                            {(categoryData as report[]).map((item, index) => (
                                <div key={index} className={styles.dataItem}>
                                    <div className={styles.categoryData}>{item.reportNo}</div>
                                    <div className={styles.categoryData}>{item.category}</div>
                                    <div className={styles.categoryData}>{item.reportDate}</div>
                                    <div className={styles.categoryData}>{item.typeCode}</div>
                                    <div className={styles.categoryData}>{item.refNo}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {
                showDetailModal && <DetailModal board={data} hideModal={hideDetailModal}></DetailModal>
            }
        </div>
        
    )
}
