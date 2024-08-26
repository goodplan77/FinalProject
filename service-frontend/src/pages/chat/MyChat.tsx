import { Message } from "../../type/chat";

export default function MyChat({chat}:{chat:Message}){
    return (
        <div className="myChat">
            <p className="chat">{chat.content}</p>
            <span className="chatDate">{chat.messageDate}</span>
        </div>
    )
}