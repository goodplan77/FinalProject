import { Route, Routes } from "react-router-dom"
import AlarmList from "../components/AlarmList"
import SideBar from "../components/SideBar"
import styles from "./AdminPage.module.css"
import InitPage from "./adminPages/InitPage"
import UserManagePage from "./adminPages/UserManagePage"
import UserDetailPage from "./adminPages/UserDetailPage"
import BoardManagePage from "./adminPages/BoardManagePage"
import NotifyBoardManagePage from "./adminPages/NotifyBoardManagePage"
import NotifyBoardInsertPage from "./adminPages/NotifyBoardInsertPage"
import InfoBoardManagePage from "./adminPages/InfoBoardManagePage"
import InfoBoardInsertPage from "./adminPages/InfoBoardInsertPage"
import EventBoardManagePage from "./adminPages/EventBoardManagePage"
import EventBoardInsertPage from "./adminPages/EventBoardInsertPage"
import ProductBoardManagePage from "./adminPages/ProductBoardManagePage"
import ProductBoardInsertPage from "./adminPages/ProductBoardInsertPage"
import InquiryManagePage from "./adminPages/InquiryManagePage"
import ReportManagePage from "./adminPages/ReportManagePage"

export default function AdminPage () {
    return (
        <div className={styles.adminMain}>
            <div className={styles.pageArea}>
                <Routes>
                    <Route path='/' element={<InitPage />} />
                    <Route path='userManage' element={<UserManagePage />} />
                    <Route path='userDetail' element={<UserDetailPage />} />
                    <Route path='boardManage' element={<BoardManagePage />} />
                    <Route path='nonifyBoardManage' element={<NotifyBoardManagePage />} />
                    <Route path='notifyBoardInsert' element={<NotifyBoardInsertPage />} />
                    <Route path='infoBoardManage' element={<InfoBoardManagePage />} />
                    <Route path='infoBoardInsert' element={<InfoBoardInsertPage />} />
                    <Route path='eventBoardManage' element={<EventBoardManagePage />} />
                    <Route path='eventBoardInsert' element={<EventBoardInsertPage />} />
                    <Route path='productBoardManagePage' element={<ProductBoardManagePage />} />
                    <Route path='productBoardInsertPage' element={<ProductBoardInsertPage />} />
                    <Route path='reportManagePage' element={<ReportManagePage />} />
                    <Route path='inquiryManagePage' element={<InquiryManagePage />} />
                </Routes>
            </div>
            <AlarmList/>
            <SideBar/>
        </div>
    )
}