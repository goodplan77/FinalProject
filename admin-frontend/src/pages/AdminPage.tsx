import { Route, Routes } from "react-router-dom"
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
import AskManagePage from "./adminPages/AskManagePage"
import ReportManagePage from "./adminPages/ReportManagePage"
import NotifyBoardUpdatePage from "./adminPages/NotifyBoardUpdatePage"
import InfoBoardUpdatePage from "./adminPages/InfoBoardUpdatePage"
import ProductBoardUpdatePage from "./adminPages/ProductBoardUpdatePage"

export default function AdminPage() {
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
                    <Route path='infoBoardUpdate' element={<InfoBoardUpdatePage />} />
                    <Route path='notifyBoardUpdatePage' element={<NotifyBoardUpdatePage />} />
                    <Route path='eventBoardManage' element={<EventBoardManagePage />} />
                    <Route path='eventBoardInsert' element={<EventBoardInsertPage />} />
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