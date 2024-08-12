import { Link } from "react-router-dom"
import styles from "./css/SideBar.module.css"

export default function SideBar() {
    return (
        <nav className={styles.main}>
            <div>
                <span>관리자 정보 영역</span>
            </div>
            <ul>
                <li><Link to="userManage">회원 관리</Link></li>
                <li><Link to="boardManage">게시글 관리</Link></li>
                <li><Link to="nonifyBoardManage">공지사항 관리</Link></li>
                <li><Link to="infoBoardManage">이벤트 게시글 관리</Link></li>
                <li><Link to="eventBoardManage">정보 게시글 관리</Link></li>
                <li><Link to="productBoardManagePage">상품 등록 관리</Link></li>
                <li><Link to="reportManagePage">신고 관리</Link></li>
                <li><Link to="inquiryManagePage">문의 관리</Link></li>
            </ul>
        </nav>
    )
}