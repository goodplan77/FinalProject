import styles from './InfoBoardManagePage.module.css';

export default function InfoBoardManagePage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>정보 게시글 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="게시글 정보 검색"
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.categoryButtons}>
                <button className={styles.categoryButton}>강아지 정보</button>
                <button className={styles.categoryButton}>질병 정보</button>
            </div>
            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.headerItem}>UID</span>
                    <span className={styles.headerItem}>게시글 제목</span>
                    <span className={styles.headerItem}>분류</span>
                    <span className={styles.headerItem}>작성날짜</span>
                    <span className={styles.headerItem}>수정날짜</span>
                    <span className={styles.headerItem}>조회수</span>
                    <span className={styles.headerItem}>좋아요</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={styles.memberRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.memberId}>00001</span>
                        <span className={styles.memberEmail}>치와와 정보</span>
                        <span className={styles.memberNickname}>강아지</span>
                        <span className={styles.memberJoinDate}>2024.01.11</span>
                        <span className={styles.memberJoinDate}>2024.01.12</span>
                        <span className={styles.memberJoinDate}>12345</span>
                        <span className={styles.memberJoinDate}>9999</span>
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
            <button className={styles.addButton}>추가</button>
        </div>
    )
}