import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles/MainHeader.module.css';

export default function MainHeader() {
    const ScrollToTop = () => {
        const { pathname } = useLocation();
      
        useEffect(() => {
          window.scrollTo(0, 0);
        }, [pathname]);
      
        return null;
      };

    return(
        <>
            <ScrollToTop />
            <div className={styles.mainHeader}>
                <div className={styles.backButton}>
                    <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" />
                </div>
                <div className={styles.projectName}>
                    <div className={styles.projectLogo}>
                        <img className={styles.logo} src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
                    </div>
                    <div className={styles.projectTitle}>
                        <p className={styles.projectTitleText}>반주한상</p>
                    </div>
                </div>
                <div className={styles.headerButtons}>
                    <div className={styles.aram}>
                        <img className={styles.aramImg} src={`${process.env.PUBLIC_URL}/images/bell.png`} alt="aram" />
                    </div>
                    <div className={styles.search}>
                        <img className={styles.searchImg} src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search" />
                    </div>
                </div>
            </div>
        </>
    )
}