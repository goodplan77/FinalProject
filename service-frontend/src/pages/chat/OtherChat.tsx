import { Message } from "../../type/chat";
import styles from './styles/OtherChat.module.css';

export default function OtherChat({ chat }: { chat: Message }) {
    return (
        <div className={styles.youChat}>
            <div className={styles.otherChat}>
                <p className={styles.chat}>{chat.content}</p>
                <span className={styles.chatDate}>{chat.messageDate}</span>
            </div>
        </div>
    )
}