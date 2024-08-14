import styles from './EventBoardInsertPage.module.css';

export default function EventBoardInsertPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>이벤트 등록</h1>
            <div className={styles.formContent}>
                <div className={styles.leftSection}>
                    <div className={styles.formContainer}>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>제목</label>
                            <input
                                type="text"
                                placeholder="제목을 입력하세요."
                                className={styles.textInput}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>내용 작성</label>
                            <textarea
                                placeholder="내용을 입력하세요."
                                className={styles.textArea}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.uploadSection}>
                        <div className={styles.uploadIcon}>
                            {/* 여기에 파일 업로드 아이콘을 넣을 수 있습니다. */}
                            <svg width="80" height="80" viewBox="0 0 24 24"><path fill="#000000" d="M5 20v-2h14v2H5m7-14l5 5h-3v6h-4v-6H7l5-5z" /></svg>
                        </div>
                        <div className={styles.uploadText}>사진 파일 업로드</div>
                    </div>
                    <div className={styles.toggleGroup}>
                        <div className={styles.toggleField}>
                            <span className={styles.toggleLabel}>좋아요 활성화</span>
                            <div className={styles.toggleSwitch}>
                                <div className={styles.knob}></div>
                            </div>
                        </div>
                        <div className={styles.toggleField}>
                            <span className={styles.toggleLabel}>댓글 및 후기 활성화</span>
                            <div className={styles.toggleSwitch}>
                                <div className={styles.knob}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button className={styles.cancelButton}>취소</button>
                        <button className={styles.submitButton}>게시</button>
                    </div>
                </div>
            </div>
        </div>
    )
}