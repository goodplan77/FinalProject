import styles from './UserManagePage.module.css';

export default function UserManagePage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>회원 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="사용자 이름 검색"
                    className={styles.searchInput}
                />
            </div>
            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.headerItem}>ID</span>
                    <span className={styles.headerItem}>이메일</span>
                    <span className={styles.headerItem}>닉네임</span>
                    <span className={styles.headerItem}>가입일</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={styles.memberRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.memberId}>ID0001</span>
                        <span className={styles.memberEmail}>goodplan77@naver.com</span>
                        <span className={styles.memberNickname}>닉네임111</span>
                        <span className={styles.memberJoinDate}>2024.07.16</span>
                        <div className={styles.toggleContainer}>
                            <div className={styles.toggle}></div>
                        </div>
                        <div></div>
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