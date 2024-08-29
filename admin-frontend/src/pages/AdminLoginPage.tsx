import { useNavigate } from "react-router-dom";
import styles from "./AdminLoginPage.module.css"
import { useState } from "react";
import axios from "axios";
import { setCookie } from "../utils/Cookie";
import { adminUser, initAdminUser, initLoginData, LoginData } from "../type/admin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loginAdminUser } from "../features/adminSlice";

export default function AdminLoginPage() {
    const navi = useNavigate();

    const dispatch = useDispatch();
    const [data, setData] = useState<LoginData>(initLoginData);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    function adminLogin(e: React.FormEvent) {
        e.preventDefault();
        axios.post("http://localhost:8013/banju/admin/user/login", data)
            .then(res => {
                const msg = res.data.msg
                const jwtToken = res.data.jwtToken;
                alert(msg);
                setData(initLoginData);
                setCookie("accessToken", jwtToken);
                setCookie("admin", res.data.user);
                dispatch(loginAdminUser(res.data.admin));
                navi('./adminPage');
            })
            .catch(err => {
                console.log(err)
                const msg = err.response.data.msg
                alert(msg);
                setData({
                    email: '',
                    pwd: ''
                })
            })
    }
    return (
        <>
            <div className={styles.title}>
                <h2>반주 한상 관리자 페이지</h2>
                <img src="/images/Banju_Icon2.png" alt="Banju Icon" className={styles.logoImg} />
                <div className={styles.main}>
                    <form className={styles.loginModal} onSubmit={adminLogin}>
                        <div className={styles.emailInput}>
                            <div>Email</div>
                            <input type="text"
                                placeholder="관리자 이메일을 입력하세요."
                                onChange={handleInputChange}
                                name="email"
                                value={data.email}
                                required></input>
                        </div>
                        <div className={styles.pwdInput}>
                            <div>Password</div>
                            <input type="password"
                                placeholder="비밀번호를 입력하세요."
                                onChange={handleInputChange}
                                name="pwd"
                                value={data.pwd}
                                required></input>
                        </div>
                        <div className={styles.buttonArea}>
                            <button type="submit">이동</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}