import { Link, useNavigate } from "react-router-dom"
import styles from "./css/SideBar.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function SideBar() {


    const dispatch = useDispatch();
    const asks  = useSelector((state: RootState) => state.asks);
    const reports = useSelector((state: RootState) => state.reports);

    useEffect(() => {

    },[asks , reports])

    const navi = useNavigate();

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
                    <span className={styles.adminInfoName}>관리자 누군가</span>
                    <button className={styles.logoutButton} onClick={() => navi('/')}>❌</button>
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
                        <img src={`${process.env.PUBLIC_URL}/images/Banju_Icon.png`}></img>
                    </div>
                    <div className={styles.alarmHeaderText}>
                        <span>알림 목록</span>
                    </div>
                </div>
                <div className={styles.alarms} onClick={() => navi('reportManagePage')}>
                    <div className={styles.alarmName}>신고 목록1</div>
                    <div className={styles.alarmTime}>12시간 전</div>
                </div>
                <div className={styles.alarms} onClick={() => navi('reportManagePage')}>
                    <div className={styles.alarmName}>신고 목록2</div>
                    <div className={styles.alarmTime}>12시간 전</div>
                </div>
                <div className={styles.alarms} onClick={() => navi('reportManagePage')}>
                    <div className={styles.alarmName}>신고 목록3</div>
                    <div className={styles.alarmTime}>12시간 전</div>
                </div>
                <div className={styles.alarms} onClick={() => navi('reportManagePage')}>
                    <div className={styles.alarmName}>신고 목록4</div>
                    <div className={styles.alarmTime}>12시간 전</div>
                </div>
                <div className={styles.alarms} onClick={() => navi('reportManagePage')}>
                    <div className={styles.alarmName}>신고 목록5</div>
                    <div className={styles.alarmTime}>12시간 전</div>
                </div>
            </div>
        </nav>
    )
}