import { Message } from "../../type/chat";
import styles from './styles/MyChat.module.css';

export default function MyChat({ chat }: { chat: Message }) {
    return (
        <div className={styles.meChat}>
            <div className={styles.myChat}>
                <p className={styles.chat}>{chat.content}</p>
                <p className={styles.chatDate}>{chat.messageDate}</p>
            </div>
        </div>
    )
}