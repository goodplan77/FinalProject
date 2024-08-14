import styles from './AskManagePage.module.css';

export default function InquiryManagePage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>문의 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="통합 검색"
                    className={styles.searchInput}
                />
            </div>
            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.inquiryList}>
                <div className={styles.inquiryListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>UID</span>
                    <span>작성자</span>
                    <span>문의 내용</span>
                    <span>작성 날짜</span>
                    <span>답변 상태</span>
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={styles.inquiryRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span>00001</span>
                        <span>냥집사</span>
                        <span>포인트 물건 종류 좀 늘려주세요</span>
                        <span>2024.06.17</span>
                        <span>X</span>
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