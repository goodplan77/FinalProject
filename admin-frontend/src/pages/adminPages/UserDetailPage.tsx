import styles from './UserDetailPage.module.css';

export default function UserDetailPage() {
    return (
        <div className={styles.userProfileContainer}>
            <div className={styles.profileContainer}>
                <div className={styles.profileImage}></div>
                <div className={styles.profileText}>멍멍사</div>
                <div className={styles.profileValue}>UID: ID0001</div>
                <div className={styles.profileValue}>goodplan77@naver.com</div>
                <div className={styles.profileValue}>010-1234-5678</div>
                <div className={styles.profileValue}>1995 / 08 / 17</div>
            </div>

            <div className={styles.infoEditContainer}>
                <div className={styles.infoEditHeader}>정보 수정</div>
                <div className={styles.infoEditItem}>
                    <div className={styles.infoEditLabel}>닉네임</div>
                    <div className={styles.infoEditValue}>멍멍사</div>
                </div>
                <div className={styles.infoEditItem}>
                    <div className={styles.infoEditLabel}>E-mail</div>
                    <div className={styles.infoEditValue}>goodplan77@naver.com</div>
                </div>
                <div className={styles.infoEditItem}>
                    <div className={styles.infoEditLabel}>연락처</div>
                    <div className={styles.infoEditValue}>010-1234-5678</div>
                </div>
                <div className={styles.infoEditItem}>
                    <div className={styles.infoEditLabel}>생년 월일</div>
                    <div className={styles.infoEditValue}>1995 / 08 / 17</div>
                </div>
                <div className={styles.infoEditItem}>
                    <div className={styles.infoEditLabel}>활성화 상태</div>
                    <div className={styles.infoEditToggle}>
                        <input type="checkbox" checked />
                    </div>
                </div>
            </div>

            <div className={styles.dogInfoContainer}>
                <div className={styles.dogInfoHeader}>반려견 정보 수정</div>
                <div className={styles.dogInfoBox}>
                    <div className={styles.dogInfoText}>대표</div>
                    <div className={styles.dogInfoImage}></div>
                    <div className={styles.dogInfoText}>뽀삐</div>
                    <div className={styles.dogInfoText}>강아지종</div>
                    <div className={styles.dogInfoText}>수컷</div>
                    <div className={styles.dogInfoText}>2024.01.11</div>
                </div>
                <div className={styles.dogInfoBox}>
                    <div className={styles.dogInfoText}>--</div>
                    <div className={styles.dogInfoImage}></div>
                    <div className={styles.dogInfoText}>삐뽀</div>
                    <div className={styles.dogInfoText}>강아지종</div>
                    <div className={styles.dogInfoText}>암컷</div>
                    <div className={styles.dogInfoText}>2024.01.12</div>
                </div>
            </div>

            <div className={styles.pointInfoContainer}>
                <div className={styles.pointInfoHeader}>회원 포인트 관리</div>
                <div className={styles.pointInfoBox}>
                    <div className={styles.pointInfoText}>현재 포인트</div>
                    <div className={styles.pointInfoText}>2040P</div>
                    <div className={styles.pointInfoText}>최근 적립</div>
                    <div className={styles.pointInfoText}>0일전</div>
                    <div className={styles.pointInfoText}>최근 사용</div>
                    <div className={styles.pointInfoText}>0일전</div>
                </div>
            </div>
        </div>
    )
}