import { useNavigate } from "react-router-dom";
import styles from "./AdminLoginPage.module.css"

export default function AdminLoginPage(){
    const navi = useNavigate();
    return (
        <div className={styles.main}>
            <div className={styles.loginModal}>
                <button onClick={() => navi('/adminPage')}>이동</button>
            </div>
        </div>
    )
}