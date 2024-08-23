import styles from './ReportManagePage.module.css';

export default function ReportManagePage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>신고 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="통합 검색"
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.categoryButtons}>
                <button className={styles.categoryButton}>전체</button>
                <button className={styles.categoryButton}>사용자</button>
                <button className={styles.categoryButton}>게시글</button>
                <button className={styles.categoryButton}>댓글</button>
            </div>
            <div className={styles.categoryButtons}>
                <button className={styles.categoryButton}>전체</button>
                <button className={styles.categoryButton}>욕설</button>
                <button className={styles.categoryButton}>광고</button>
                <button className={styles.categoryButton}>기타</button>
            </div>
            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.headerItem}>UID</span>
                    <span className={styles.headerItem}>카테고리</span>
                    <span className={styles.headerItem}>작성자</span>
                    <span className={styles.headerItem}>신고 사유</span>
                    <span className={styles.headerItem}>대상 분류</span>
                    <span className={styles.headerItem}>링크</span>
                    <span className={styles.headerItem}>작성 날짜</span>
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={styles.memberRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.memberId}>00001</span>
                        <span className={styles.memberEmail}>욕설</span>
                        <span className={styles.memberNickname}>냥집사</span>
                        <span className={styles.memberJoinDate}>게시글에서 욕설을 사용 했어요</span>
                        <span className={styles.memberJoinDate}>게시글</span>
                        <span className={styles.memberJoinDate}>링크</span>
                        <span className={styles.memberJoinDate}>2024.06.17</span>
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