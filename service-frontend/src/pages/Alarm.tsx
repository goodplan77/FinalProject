import styles from './css/Alarm.module.css';

export default function Alarm() {

    const notifications = [
        "닉네임님이 회원님의 게시글을 좋아합니다",
        "닉네임님이 회원님의 게시글에 댓글을 달았습니다",
        "닉네임님이 회원님의 댓글에 답글을 달았습니다",
        // 추가적인 알림들...
    ];

    return (
        <>
            <div className={styles.container}>
                {notifications.map((notification, index) => (
                    <div key={index} className={styles.notificationItem}>
                        <div className={styles.icon}></div>
                        <div className={styles.notificationText}>
                            <span>{notification}</span>
                            <span className={styles.date}>2024-07-29</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}