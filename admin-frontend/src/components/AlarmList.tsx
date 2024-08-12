import styles from "./css/AlarmList.module.css"

export default function AlarmList() {
    return (
        <div className={styles.main}>
           <ul>
                <li>알림1</li>
                <li>알림2</li>
                <li>알림3</li>
                <li>알림4</li>
                <li>알림5</li>
           </ul>
        </div>
    )
}