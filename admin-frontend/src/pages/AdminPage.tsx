import { Route, Routes } from "react-router-dom"
import SideBar from "../components/SideBar"
import styles from "./AdminPage.module.css"
import InitPage from "./adminPages/InitPage"
import UserManagePage from "./adminPages/user/UserManagePage"
import UserDetailPage from "./adminPages/user/UserDetailPage"
import BoardManagePage from "./adminPages/board/BoardManagePage"
import NotifyBoardManagePage from "./adminPages/notify/NotifyBoardManagePage"
import NotifyBoardInsertPage from "./adminPages/notify/NotifyBoardInsertPage"
import InfoBoardManagePage from "./adminPages/info/InfoBoardManagePage"
import InfoBoardInsertPage from "./adminPages/info/InfoBoardInsertPage"
import EventBoardManagePage from "./adminPages/event/EventBoardManagePage"
import EventBoardInsertPage from "./adminPages/event/EventBoardInsertPage"
import ProductBoardManagePage from "./adminPages/product/ProductBoardManagePage"
import ProductBoardInsertPage from "./adminPages/product/ProductBoardInsertPage"
import AskManagePage from "./adminPages/ask/AskManagePage"
import ReportManagePage from "./adminPages/report/ReportManagePage"
import NotifyBoardUpdatePage from "./adminPages/notify/NotifyBoardUpdatePage"
import InfoBoardUpdatePage from "./adminPages/info/InfoBoardUpdatePage"
import ProductBoardUpdatePage from "./adminPages/product/ProductBoardUpdatePage"
import EventBoardUpdatePage from "./adminPages/event/EventBoardUpdatePage"

export default function AdminPage() {
    return (
        <div className={styles.adminMain}>
            <div className={styles.pageArea}>
                <Routes>
                    <Route path='/' element={<InitPage />} />
                    <Route path='userManage' element={<UserManagePage />} />
                    <Route path='userDetail/:userNo' element={<UserDetailPage />} />
                    <Route path='boardManage' element={<BoardManagePage />} />
                    <Route path='nonifyBoardManage' element={<NotifyBoardManagePage />} />
                    <Route path='notifyBoardInsert' element={<NotifyBoardInsertPage />} />
                    <Route path='notifyBoardUpdate' element={<NotifyBoardUpdatePage />} />
                    <Route path='infoBoardManage' element={<InfoBoardManagePage />} />
                    <Route path='infoBoardInsert' element={<InfoBoardInsertPage />} />
                    <Route path='infoBoardUpdate' element={<InfoBoardUpdatePage />} />
                    <Route path='notifyBoardUpdatePage' element={<NotifyBoardUpdatePage />} />
                    <Route path='eventBoardManage' element={<EventBoardManagePage />} />
                    <Route path='eventBoardInsert' element={<EventBoardInsertPage />} />
                    <Route path='eventBoardUpdate' element={<EventBoardUpdatePage />} />
                    <Route path='productBoardManagePage' element={<ProductBoardManagePage />} />
                    <Route path='productBoardInsertPage' element={<ProductBoardInsertPage />} />
                    <Route path='productBoardUpdatePage' element={<ProductBoardUpdatePage />} />
                    <Route path='reportManagePage' element={<ReportManagePage />} />
                    <Route path='askManagePage' element={<AskManagePage />} />
                </Routes>
            </div>
            <SideBar />
        </div>
    )
}