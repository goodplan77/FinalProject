import { Link, useNavigate } from "react-router-dom";
import styles from "./css/SideBar.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../features/adminSlice";
import axios from "axios";

export default function SideBar() {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const adminUser = useSelector((state: RootState) => state.admins);
    const [askCount, setAskCount] = useState(0);
    const [reportCount, setReportCount] = useState(0);

    useEffect(() => {

        const updateUnReadList = () => {
            axios.get("http://localhost:8013/banju/alarm/unReadList")
            .then((response) => {
                for(let item of response.data.list) {
                    switch (item.typeCode) {
                        case 'A':
                            setAskCount(prevCount => prevCount + 1);
                            break;
                        case 'R':
                            setReportCount(prevCount => prevCount + 1);
                            break;
                        default:
                            console.warn(`Unknown alarm type: ${item.typeCode}`);
                    }
                }
            })
            .catch((response) => {
                console.log(response);
            })
        }

        const createEventSource = () => {
            const eventSource = new EventSource('http://localhost:8013/banju/alarm/subscribe');

            eventSource.addEventListener('alarm', function(event) {
                try {
                    const newAlarm = JSON.parse(event.data);  // JSON 데이터를 파싱
                    if (newAlarm) {
                        switch (newAlarm.typeCode) {
                            case 'A':
                                setAskCount(prevCount => prevCount + 1);
                                break;
                            case 'R':
                                setReportCount(prevCount => prevCount + 1);
                                break;
                            default:
                                console.warn(`Unknown alarm type: ${newAlarm.typeCode}`);
                        }
                    }
                } catch (error) {
                    console.error("JSON 파싱 중 오류 발생:", error);
                }
            });

            eventSource.onerror = function(event) {
                console.error("SSE connection error", event);
                eventSource.close();

                // 일정 시간 후 재연결 시도
                setTimeout(() => {
                    createEventSource(); // 재연결 시도 시 새로운 EventSource 생성
                }, 3000);  // 3초 후 재연결 시도
            };

            return eventSource;
        };

        updateUnReadList();

        const eventSource = createEventSource();

        return () => {
            eventSource.close(); // Cleanup the event source when component unmounts
        };
    }, []);

    function adminLogout() {
        alert('로그아웃 합니다.');
        dispatch(logout());
        navi('/');
    }

    return (
        <nav className={styles.main}>
            <div className={styles.mainHeader}>
                <div className={styles.mainHeaderImage}>
                    <img src={`${process.env.PUBLIC_URL}/images/Banju_Icon2.png`} alt="반주 아이콘" />
                </div>
                <div className={styles.mainHeaderText}>
                    <span>반주 한상</span>
                </div>
            </div>
            <div className={styles.adminInfo}>
                <div className={styles.adminInfoImage}>
                    <img src={`${process.env.PUBLIC_URL}/images/admin_profile.jpg`} alt="관리자 프로필" />
                </div>
                <div className={styles.adminInfoDetails}>
                    <span className={styles.adminInfoName}>{adminUser.nickName}</span>
                    <button className={styles.logoutButton} onClick={adminLogout}>❌</button>
                </div>
            </div>

            <div className={styles.featureList}>
                <div className={styles.featuresHeader}>관리자 기능 목록</div>
                <Link to="userManage" className={styles.featureLink}>
                    <div className={styles.featureItem}>회원 관리</div>
                </Link>
                <Link to="boardManage" className={styles.featureLink}>
                    <div className={styles.featureItem}>회원 게시글 관리</div>
                </Link>
                <Link to="nonifyBoardManage" className={styles.featureLink}>
                    <div className={styles.featureItem}>공지사항 관리</div>
                </Link>
                <Link to="eventBoardManage" className={styles.featureLink}>
                    <div className={styles.featureItem}>이벤트 게시글 관리</div>
                </Link>
                <Link to="infoBoardManage" className={styles.featureLink}>
                    <div className={styles.featureItem}>정보 게시글 관리</div>
                </Link>
                <Link to="productBoardManagePage" className={styles.featureLink}>
                    <div className={styles.featureItem}>상품 등록 관리</div>
                </Link>
                <Link to="reportManagePage" className={styles.featureLink}>
                    <div className={styles.featureItem}>신고 관리</div>
                </Link>
                <Link to="askManagePage" className={styles.featureLink}>
                    <div className={styles.featureItem}>문의 관리</div>
                </Link>
            </div>

            <div className={styles.alarmList}>
                <div className={styles.alarmHeader}>
                    <div className={styles.alarmHeaderImage}>
                        <img src={`${process.env.PUBLIC_URL}/images/Banju_Icon.png`} alt="알림 아이콘" />
                    </div>
                    <div className={styles.alarmHeaderText}>
                        <span>알림 목록</span>
                    </div>
                </div>
                <div className={styles.alarms} onClick={() => {
                    navi('reportManagePage');
                }}>
                    <div className={styles.alarmName}>신고 목록</div>
                    <div className={
                        reportCount > 0 
                        ? `${styles.alarmCount} ${styles.hasCount}` 
                        : `${styles.alarmCount} ${styles.NoCount}`
                    }>{reportCount}</div>
                </div>
                <div className={styles.alarms} onClick={() => {
                    navi('askManagePage');
                }}>
                    <div className={styles.alarmName}>문의 목록</div>
                    <div className={
                        askCount > 0 
                        ? `${styles.alarmCount} ${styles.hasCount}` 
                        : `${styles.alarmCount} ${styles.NoCount}`
                    }>{askCount}</div>
                </div>
            </div>
        </nav>
    );
}
