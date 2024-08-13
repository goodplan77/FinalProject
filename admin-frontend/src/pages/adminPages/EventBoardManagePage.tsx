import { useState } from 'react';
import styles from './EventBoardManage.module.css'

export default function EventBoardManagePage() {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>이벤트 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="게시글 정보 검색"
                    className={styles.searchInput}
                />
            </div>
            <button className={styles.deleteButton}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span className={styles.headerItem}>UID</span>
                    <span className={styles.headerItem}>게시글 제목</span>
                    <span className={styles.headerItem}>작성날짜</span>
                    <span className={styles.headerItem}>수정날짜</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={styles.memberRow}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.memberId}>000{index + 1}</span>
                        <span className={styles.memberEmail}>관리자가 쏜다!!!!</span>
                        <span className={styles.memberJoinDate}>2024.01.11</span>
                        <span className={styles.memberJoinDate}>2024.01.12</span>
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

            {/* 모달 */}
            <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>게시글 삭제 알림</h2>
                        <button className={styles.closeButton}>X</button>
                    </div>
                    <div className={styles.modalBody}>
                        해당 하는 게시글이 삭제 됩니다. 정말로 지우시겠습니까?
                        <br />
                        UID : 0001, 관리자가 쏜다!!!!
                    </div>
                    <div className={styles.modalFooter}>
                        <button className={styles.cancelButton}>취소</button>
                        <button className={styles.confirmButton}>삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
};