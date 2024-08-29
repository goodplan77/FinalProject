import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Navibar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { initUser } from '../type/user';

export default function Navibar() {
    let loginUser = useSelector((state: RootState) => state.user);
    const navi = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);


    return (
        <div className={styles.container}>
            <img src='/images/home.png' alt="메인페이지로" style={{ height: "30px" }} onClick={() => navi('/')} />
            <img src='/images/hamburger.png' alt='게시판 목록' style={{ height: "30px" }} onClick={handleHamburgerClick} />
            <img src='/images/message.png' alt='메세지' style={{ height: "28px" }} onClick={() => navi('chatList')} />
            <img src='/images/login.png' alt='마이페이지' style={{ height: "32px" }} onClick={() => {
                if (loginUser.userNo == 10 || loginUser == null) {
                    navi('login');
                } else {
                    navi('/mypage')
                }
            }} />

            {isMenuOpen && (
                <div className={styles.menu} ref={menuRef}>
                    <ul>
                        <li onClick={() => navi('boardList')}>일반 게시판</li>
                        <li onClick={() => navi('usedList')}>중고 거래</li>
                        <li onClick={() => navi('adoptList')}>입양</li>
                        <li onClick={() => navi('missingList')}>실종 신고</li>
                        <li onClick={() => navi('dogInfo')}>강아지 정보</li>
                        <li onClick={() => navi('weather')}>날씨</li>
                        <li onClick={() => navi('petPlace')}>펫 플레이스</li>
                        <li onClick={() => navi('event')}>이벤트</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
