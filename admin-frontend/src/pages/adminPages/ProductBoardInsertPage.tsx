import styles from './ProductBoardInsertPage.module.css';

export default function ProductBoardInsertPage() {


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>포인트 교환 상품 정보 작성</h1>
            <div className={styles.formContent}>
                <div className={styles.leftSection}>
                    <div className={styles.formContainer}>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>상품 이름</label>
                            <input
                                type="text"
                                placeholder="상품 이름을 입력하세요."
                                className={styles.textInput}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>포인트 설정</label>
                            <input
                                type="text"
                                placeholder="포인트 값을 입력하세요."
                                className={styles.textInput}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>초기 재고수 설정</label>
                            <input
                                type="text"
                                placeholder="0"
                                className={styles.textInput}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>내용 작성</label>
                            <textarea
                                placeholder="상품에 대한 상세 정보를 입력하세요."
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
                        <div className={styles.toggleField}>
                            <span className={styles.toggleLabel}>교환 활성화 (노출 활성화)</span>
                            <div className={styles.toggleSwitch}>
                                <div className={styles.knob}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button className={styles.cancelButton}>취소</button>
                        <button className={styles.submitButton}>작성</button>
                    </div>
                </div>
            </div>
        </div>
    )
}