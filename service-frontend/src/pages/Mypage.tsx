import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './css/MyPage.module.css';

const MyPage = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();

    return (
        <>
            <div className={styles.mypage}>
                <div className={styles.myHeader}>
                    <div className={styles.backButton}>
                        <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" onClick={() => navi('/')} />
                    </div>
                    <div className={styles.projectName}>
                        <div className={styles.projectLogo}>
                            <img className={styles.logo} src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
                        </div>
                        <div className={styles.projectTitle}>
                            <p className={styles.projectTitleText}>반주한상</p>
                        </div>
                    </div>
                    <div className={styles.headerButtons}>
                        <div className={styles.aram}>
                            <img className={styles.aramImg} src={`${process.env.PUBLIC_URL}/images/bell.png`} alt="aram" />
                        </div>
                        <div className={styles.search}>
                            <img className={styles.searchImg} src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search" />
                        </div>
                    </div>
                </div>

                <div className={styles.myInfo}>
                    <div className={styles.profileFrame}>
                        <div className={styles.profileSettingFrame}>
                            <div className={styles.profilePictureFrame}>
                                <div className={styles.profilePicture} />
                            </div>
                            <div className={styles.nicknameFrame}>
                                <div className={styles.nickname}>내 닉네임</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.pointsFrame}>
                        <div className={styles.pointsTextFrame}>
                            <div className={styles.pointsText}>내 포인트 :</div>
                        </div>
                        <div className={styles.pointsValueFrame}>
                            <div className={styles.pointsValue}>1500 P</div>
                        </div>
                    </div>
                </div>

                <div className={styles.additionalInfo}>
                    <div className={styles.additionalProfileFrame}>
                        <div className={styles.additionalProfileSettingFrame}>
                            <div className={styles.additionalProfilePictureFrame}>
                                <div className={styles.additionalProfilePicture} />
                            </div>
                            <div className={styles.additionalNicknameFrame}>
                                <div className={styles.additionalNickname}>내 반려견 이름</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.petButton}>
                        <div className={styles.petButtonText}>나의 반려견</div>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <div className={styles.buttonFrame1}>
                        <div className={styles.buttonText1} onClick={() => navi('/calendarPage')}>캘린더</div>
                    </div>
                    <div className={styles.buttonFrame2}>
                        <div className={styles.buttonText2}>내가 쓴 글 목록</div>
                    </div>
                    <div className={styles.buttonFrame3}>
                        <div className={styles.buttonText3}>좋아요 목록</div>
                    </div>
                </div>

                <div className={styles.listContainer}>
                    <div className={styles.listItem}>
                        <div className={styles.listItemText}>문의하기</div>
                        <div className={styles.backIcon} />
                    </div>
                    <div className={styles.horizontalDivider} />
                    <div className={styles.listItem}>
                        <div className={styles.listItemText}>공지사항</div>
                        <div className={styles.backIcon} />
                    </div>
                    <div className={styles.horizontalDivider} />
                    <div className={styles.listItem}>
                        <div className={styles.listItemText}>Q&A</div>
                        <div className={styles.backIcon} />
                    </div>
                    <div className={styles.horizontalDivider} />
                    <div className={styles.listItem}>
                        <div className={styles.listItemText}>이용약관</div>
                        <div className={styles.backIcon} />
                    </div>
                </div>

                <div className={styles.buttonFooter}>
                    <div className={styles.buttonEdit} onClick={() => navi('/edit')}>
                        <div className={styles.buttonEditText}>개인정보 수정</div>
                    </div>
                    <div className={styles.buttonLogout} onClick={() => navi('/')}>
                        <div className={styles.buttonLogoutText}>로그아웃</div>
                    </div>
                    <div className={styles.buttonLogin} onClick={() => navi('/login')}>
                        <div className={styles.buttonLoginText}>로그인</div>
                    </div>
                </div>


            </div>
        </>

    );
};

export default MyPage;
