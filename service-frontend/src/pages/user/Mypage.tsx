import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles/MyPage.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../features/userSlice';
import { selectedAllAlarm } from '../../features/alarmSlice';
import { Dog, initDog } from '../../type/dog';

const MyPage = () => {
    let loginUser = useSelector((state: RootState) => state.user);
    let alarms = useSelector((state: RootState) => state.alarm);
    const dispatch = useDispatch();
    const navi = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [ask, setAsk] = useState("");
    const [title, setTitle] = useState("");
    const [activeTab, setActiveTab] = useState<'myPosts' | 'likedPosts' | null>(null);
    const [dog , setDog] = useState<Dog>(initDog);

    const filePath = "http://localhost:8013/banju/images";

    useEffect(() => {
        axios.get(`http://localhost:8013/banju/user/selectDogs/${loginUser.userNo}`)
        .then((response) => {
            setDog(response.data[0]);
        })
    },[])

    // 로그아웃 함수
    const logoutApp = () => {
        alert("로그아웃합니다.");
        dispatch(selectedAllAlarm([]));
        dispatch(logout());
        navi('/');
    }

    // 모달 열기
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setShowModal(false);
        setAsk("");
        setTitle("");
    };

    // 문의 저장
    const handleAsk = () => {
        if (!ask || !title) {
            alert("문의 하실 내용을 입력하세요.");
            return;
        }

        const askData = {
            title: title,
            content: ask,
            userNo: loginUser.userNo
        }

        axios.post('http://localhost:8013/banju/mypage/insertAsk', askData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response);
                alert("문의가 접수되었습니다.");
            })
            .catch((error) => {
                console.log(error);
            })

        setShowModal(false);
        setAsk("");
        setTitle("");
    };

    // 문의 내용 변경 처리
    const handleChangeAsk = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAsk(event.target.value);
    };

    // 제목 변경 처리
    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handlePost = (userNo: number) => {
        navi(`/postedPage/${userNo}`);
    };

    const handleLike = (userNo: number) => {
        navi(`/likedList/${userNo}`);
    };

    const handleCalendar = (userNo: number) => {
        navi(`/calendarPage/${userNo}`);
    }

    return (
        <>
            <div className={styles.mypage}>
                <div className={styles.myInfo}>
                    <div className={styles.profileFrame}>
                        <div className={styles.profileSettingFrame}>
                            <div className={styles.profilePictureFrame}>
                                <img src={
                                    loginUser.imgUser == null ?
                                        '/images/icon.png' :
                                        filePath + '/user/' + loginUser.imgUser.changeName
                                } alt="프사" className={styles.img} />
                            </div>
                            <div className={styles.nicknameFrame}>
                                <div className={styles.nickname}>{loginUser.nickName}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.pointsFrame}>
                        <div className={styles.pointsTextFrame}>
                            <div className={styles.pointsText}>내 포인트 :</div>
                        </div>
                        <div className={styles.pointsValueFrame}>
                            <div className={styles.pointsValue}>{loginUser.points} P</div>
                        </div>
                    </div>
                </div>

                <div className={styles.additionalInfo}>
                    <div className={styles.additionalProfileFrame}>
                        <div className={styles.additionalProfileSettingFrame}>
                            <div className={styles.additionalProfilePictureFrame}>
                                <img src={
                                    dog && dog.imgDog && dog.imgDog.changeName ?
                                        `${filePath}/dog/${dog.imgDog.changeName}` :
                                        '/images/icon.png'
                                } alt="개프사" className={styles.additionalProfilePicture} />
                            </div>
                            <div className={styles.additionalNicknameFrame}>
                                <div className={styles.additionalNickname}>{
                                    dog && dog.dogName ?
                                        dog.dogName :
                                        '등록된 반려견이 없습니다.'
                                }</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.petButton}>
                        <div className={styles.petButtonText} onClick={() => navi('/insertDog')}>반려견 추가</div>
                    </div>
                    <div className={styles.petButton}>
                        <div className={styles.petButtonText} onClick={() => navi('/dogList')}>나의 반려견</div>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <div className={styles.buttonFrame1}>
                        <div className={styles.buttonText1} onClick={() => handleCalendar(loginUser.userNo)}>캘린더</div>
                    </div>
                    <div className={styles.buttonFrame2}>
                        <div className={styles.buttonText2} onClick={() => handlePost(loginUser.userNo)}>내가 쓴 글 목록</div>
                    </div>
                    <div className={styles.buttonFrame3}>
                        <div className={styles.buttonText3} onClick={() => handleLike(loginUser.userNo)}>좋아요 목록</div>
                    </div>
                </div>

                <div className={styles.listContainer}>
                    <div className={styles.listItem} onClick={handleOpenModal}>
                        <div className={styles.listItemText}>문의하기</div>
                        <div className={styles.backIcon} />
                    </div>
                    <div className={styles.horizontalDivider} />
                    <div className={styles.listItem} onClick={() => navi('/noticePage')}>
                        <div className={styles.listItemText}>공지사항</div>
                        <div className={styles.backIcon} />
                    </div>
                    <div className={styles.horizontalDivider} />
                    <div className={styles.listItem}>
                        <div className={styles.listItemText} onClick={() => navi('/clause')}>이용약관</div>
                        <div className={styles.backIcon} />
                    </div>
                </div>

                <div className={styles.buttonFooter}>
                    <div className={styles.buttonEdit} onClick={() => navi('/updateUser')}>
                        <div className={styles.buttonEditText}>개인정보 수정</div>
                    </div>
                    <div className={styles.buttonLogout} onClick={logoutApp}>
                        <div className={styles.buttonLogoutText}>로그아웃</div>
                    </div>
                </div>
                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2>문의 하기</h2>
                            <input
                                className={styles.askInput}
                                value={title}
                                onChange={handleChangeTitle} // onChange 핸들러 추가
                                placeholder="제목을 입력하세요"
                            />
                            <textarea
                                value={ask}
                                onChange={handleChangeAsk}
                                placeholder='문의 내용을 입력해주세요'
                            />
                            <button onClick={handleAsk}>제출</button>
                            <button onClick={handleCloseModal}>취소</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyPage;
