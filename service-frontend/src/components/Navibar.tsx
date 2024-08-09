import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navibar.module.css';
export default function Navibar(){

    const navi = useNavigate();

    return(
        <div className={styles.container}>
            <img src='/images/home.png' alt="메인페이지로" style={{height : "30px"}} onClick={()=>navi('/')}/>
            <img src='/images/hamburger.png' alt='게시판 목록' style={{height : "30px"}}/>
            <img src='/images/message.png' alt='메세지' style={{height : "28px"}}/>
            <img src='/images/login.png' alt='마이페이지' style={{height : "32px"}}/>
        </div>
    )
}