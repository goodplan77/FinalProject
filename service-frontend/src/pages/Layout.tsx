import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Layout.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="layout-wrapper">
            <div className="layout-container">
                <header className="header">
                    <div className="header-content">
                        <div className="back-button">
                            <img className="back" src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" onClick={() => navigate(-1)} />
                        </div>
                        <div className="project-name">
                            <div className="project-logo">
                                <img className="logo" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
                            </div>
                            <div className="project-title">
                                <p>반주한상</p>
                            </div>
                        </div>
                        <div className="header-buttons">
                            <div className="aram">
                                <img className="aram" src={`${process.env.PUBLIC_URL}/images/bell.png`} alt="bell" />
                            </div>
                            <div className="search">
                                <img className="search" src={`${process.env.PUBLIC_URL}/images/search.png`} alt="search" />
                            </div>
                        </div>
                    </div>
                </header>
                <main className="content">
                    {children}
                </main>
                <footer className="footer">
                    <div className="footer-content">
                        <div className="navi-home">
                            <img className="home" src={`${process.env.PUBLIC_URL}/images/home.png`} alt="home" />
                        </div>
                        <div className="navi-ham">
                            <img className="ham" src={`${process.env.PUBLIC_URL}/images/ham.png`} alt="ham" />
                        </div>
                        <div className="navi-chat">
                            <img className="chat" src={`${process.env.PUBLIC_URL}/images/message.png`} alt="chat" />
                        </div>
                        <div className="navi-my" onClick={() => navigate('/mypage')}>
                            <img className="my" src={`${process.env.PUBLIC_URL}/images/myPage.png`} alt="mypage" />
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
