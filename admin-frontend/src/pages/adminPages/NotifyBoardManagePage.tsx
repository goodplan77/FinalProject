import { useState } from 'react';
import styles from './NotifyBoardManagePage.module.css';
import { useNavigate } from 'react-router-dom';

export default function NotifyBoardManagePage() {
    const navi = useNavigate();
    const [activeCategory, setActiveCategory] = useState<string>('전체');

    const categories = ['전체', '일반', '중고', '분양', '실종'];

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>공지사항 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="게시글 정보 검색"
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.categoryBar}>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''
                            }`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>UID</span>
                    <span>게시글 제목</span>
                    <span>분류</span>
                    <span>작성날짜</span>
                    <span>수정날짜</span>
                    <span>활성화</span>
                </div>
                
            </div>
            <div className={styles.pagination}>
                <span className={styles.page}>1</span>
                <span className={styles.page}>2</span>
                <span className={styles.page}>3</span>
                <span className={styles.pageGap}>...</span>
                <span className={styles.page}>67</span>
                <span className={styles.page}>68</span>
            </div>
            <div className={styles.addButton} onClick={() => navi('/adminPage/notifyBoardInsert')}>+</div>
        </div>
    )
}
