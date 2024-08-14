import { Link, useNavigate } from "react-router-dom"
import styles from "./css/SideBar.module.css"

export default function SideBar() {

    const navi = useNavigate();

    return (
        <nav className={styles.main}>
            <div className={styles.mainHeader}>
                <div className={styles.mainHeaderImage}>
                    <img src={`${process.env.PUBLIC_URL}/images/Banju_Icon.png`}></img>
                </div>
                <div className={styles.mainHeaderText}>
                    <span>반주 한상</span>
                </div>
            </div>
            <div className={styles.adminInfo}>
                <div className={styles.adminInfoImage}>
                    <img src={`${process.env.PUBLIC_URL}/images/admin_profile.jpg`}></img>
                </div>
                <div className={styles.adminInfoName}>
                    <span>관리자 누군가</span>
                </div>
                <div className={styles.adminLogout}>
                    <button onClick={() => navi('/')}>로그아웃</button>
                </div>
            </div>
            <div className={styles.featureList}>
                <div className={styles.featuresHeader}>관리자 기능 목록</div>
                <div className={styles.features}><Link to="userManage">회원 관리</Link></div>
                <div className={styles.features}><Link to="nonifyBoardManage">공지사항 관리</Link></div>
                <div className={styles.features}><Link to="boardManage">게시글 관리</Link></div>
                <div className={styles.features}><Link to="eventBoardManage">이벤트 게시글 관리</Link></div>
                <div className={styles.features}><Link to="infoBoardManage">정보 게시글 관리</Link></div>
                <div className={styles.features}><Link to="productBoardManagePage">상품 등록 관리</Link></div>
                <div className={styles.features}><Link to="reportManagePage">신고 관리</Link></div>
                <div className={styles.features}><Link to="askManagePage">문의 관리</Link></div>
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