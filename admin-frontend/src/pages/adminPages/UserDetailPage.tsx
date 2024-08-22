import { useDispatch, useSelector } from 'react-redux';
import styles from './UserDetailPage.module.css';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserDetailPage() {

    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users);
    const [user , setUser] = useState(users.oneUser);

    useEffect(() => {
        axios.get(`http://localhost:8013/banju/admin/user/UserDetail/${user.userNo}`)
            .then((response) => {
                console.log(response);
            }).catch((response) => {
                console.log(response);
            })
    },[])

    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.profileContainer}>
                <div className={styles.profileImage}></div>
                <div className={styles.profileText}>{user.nickName}</div>
                <div className={styles.profileValue}>UID : {user.userNo}</div>
                <div className={styles.profileValue}>{user.email}</div>
                <div className={styles.profileValue}>{user.phone}</div>
            </div>

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
                    <div className={styles.infoEditLabel}>활성화 상태</div>
                    <div className={styles.infoEditToggle}>
                        <input type="checkbox" checked />
                    </div>
                </div>
            </div>

            <div className={styles.dogInfoContainer}>
                <div className={styles.dogInfoHeader}>반려견 정보 수정</div>
                <div className={styles.dogInfoBox}>
                    <div className={styles.dogInfoText}>대표</div>
                    <div className={styles.dogInfoImage}></div>
                    <div className={styles.dogInfoText}>뽀삐</div>
                    <div className={styles.dogInfoText}>강아지종</div>
                    <div className={styles.dogInfoText}>수컷</div>
                    <div className={styles.dogInfoText}>2024.01.11</div>
                </div>
                <div className={styles.dogInfoBox}>
                    <div className={styles.dogInfoText}>--</div>
                    <div className={styles.dogInfoImage}></div>
                    <div className={styles.dogInfoText}>삐뽀</div>
                    <div className={styles.dogInfoText}>강아지종</div>
                    <div className={styles.dogInfoText}>암컷</div>
                    <div className={styles.dogInfoText}>2024.01.12</div>
                </div>
            </div>

            <div className={styles.pointInfoContainer}>
                <div className={styles.pointInfoHeader}>회원 포인트 관리</div>
                <div className={styles.pointInfoBox}>
                    <div className={styles.pointInfoText}>현재 포인트</div>
                    <div className={styles.pointInfoText}>2040P</div>
                    <div className={styles.pointInfoText}>최근 적립</div>
                    <div className={styles.pointInfoText}>0일전</div>
                    <div className={styles.pointInfoText}>최근 사용</div>
                    <div className={styles.pointInfoText}>0일전</div>
                </div>
                <div className={styles.pointInfoBox}>
                    <div className={styles.pointInfoText}>현재 포인트</div>
                    <div className={styles.pointInfoText}>2040P</div>
                    <div className={styles.pointInfoText}>최근 적립</div>
                    <div className={styles.pointInfoText}>0일전</div>
                    <div className={styles.pointInfoText}>최근 사용</div>
                    <div className={styles.pointInfoText}>0일전</div>
                </div>
                <div className={styles.pointInfoBox}>
                    <div className={styles.pointInfoText}>현재 포인트</div>
                    <div className={styles.pointInfoText}>2040P</div>
                    <div className={styles.pointInfoText}>최근 적립</div>
                    <div className={styles.pointInfoText}>0일전</div>
                    <div className={styles.pointInfoText}>최근 사용</div>
                    <div className={styles.pointInfoText}>0일전</div>
                </div>
            </div>
        </div>
    )
}