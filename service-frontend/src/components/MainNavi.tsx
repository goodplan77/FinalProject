import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainNavi.module.css';

const MainNavi: React.FC = () => {
    const navi = useNavigate();
    return (
        <>
            <div className={styles.mainNavi}>
                <div className={styles.naviHome}>
                    <img className={styles.home} src={`${process.env.PUBLIC_URL}/images/home.png`} alt="home" onClick={() => navi('/')} />
                </div>
                <div className={styles.naviHam}>
                    <img className={styles.ham} src={`${process.env.PUBLIC_URL}/images/ham.png`} alt="ham" />
                </div>
                <div className={styles.naviChat}>
                    <img className={styles.chat} src={`${process.env.PUBLIC_URL}/images/message.png`} alt="chat" />
                </div>
                <div className={styles.naviMy} onClick={() => navi('/mypage')}>
                    <img className={styles.my} src={`${process.env.PUBLIC_URL}/images/myPage.png`} alt="myPage" />
                </div>
            </div>
        </>
    );
};

export default MainNavi;
