import styles from './NotifyBoardInsertPage.module.css';

export default function NotifyBoardUpdatePage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>공지사항 수정</h1>
            <div className={styles.formContainer}>
                <div className={styles.inputField}>
                    <label className={styles.inputLabel}>제목</label>
                    <input
                        type="text"
                        placeholder="공지사항 제목을 입력하세요"
                        className={styles.textInput}
                    />
                </div>
                <div className={styles.inputField}>
                    <label className={styles.inputLabel}>카테고리</label>
                    <select className={styles.selectInput}>
                        <option>전체</option>
                        <option>공지</option>
                        <option>업데이트</option>
                        <option>이벤트</option>
                    </select>
                </div>
                <div className={styles.inputField}>
                    <label className={styles.inputLabel}>내용 작성</label>
                    <textarea
                        placeholder="공지사항 내용을 입력하세요."
                        className={styles.textArea}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button className={styles.cancelButton}>취소</button>
                    <button className={styles.submitButton}>작성</button>
                </div>
            </div>
        </div>
    )
}