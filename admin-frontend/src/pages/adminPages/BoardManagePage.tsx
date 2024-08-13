import { useState } from 'react';
import styles from './BoardManagePage.module.css';

export default function BoardManagePage() {
    const [activeCategory, setActiveCategory] = useState('전체');

    const handleCategoryClick = (category: any) => {
        setActiveCategory(category);
        // 카테고리 변경에 따른 로직을 추가할 수 있습니다.
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>게시글 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="게시글 정보 검색"
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.categoryBar}>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '전체' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('전체')}
                >
                    전체
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '일반' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('일반')}
                >
                    일반
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '중고' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('중고')}
                >
                    중고
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '분양' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('분양')}
                >
                    분양
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === '실종' ? styles.active : ''}`}
                    onClick={() => handleCategoryClick('실종')}
                >
                    실종
                </button>
            </div>
            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.postList}>
                <div className={styles.postListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.headerItem}>UID</span>
                    <span className={styles.headerItem}>게시글 제목</span>
                    <span className={styles.headerItem}>분류</span>
                    <span className={styles.headerItem}>작성자</span>
                    <span className={styles.headerItem}>작성 날짜</span>
                    <span className={styles.headerItem}>수정 날짜</span>
                    <span className={styles.headerItem}>조회수</span>
                    <span className={styles.headerItem}>좋아요</span>
                    <span className={styles.headerItem}>신고</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={styles.postRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.postId}>UID0001</span>
                        <span className={styles.postTitle}>강아지 잡담 글 1</span>
                        <span className={styles.postCategory}>일반</span>
                        <span className={styles.postAuthor}>멍집사</span>
                        <span className={styles.postCreatedDate}>2024.06.15</span>
                        <span className={styles.postModifiedDate}>2024.06.17</span>
                        <span className={styles.postViews}>15</span>
                        <span className={styles.postLikes}>3</span>
                        <span className={styles.postReports}>0</span>
                        <div className={styles.toggleContainer}>
                            <div className={styles.toggle}></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <span className={styles.page}>1</span>
                <span className={styles.page}>2</span>
                <span className={styles.page}>3</span>
                <span className={styles.pageGap}>...</span>
                <span className={styles.page}>67</span>
                <span className={styles.page}>68</span>
            </div>
        </div>
    )
}