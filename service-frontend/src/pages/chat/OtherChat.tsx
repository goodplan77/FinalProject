import { Message } from "../../type/chat";

export default function OtherChat({chat}:{chat:Message}){
    return(
        <div>
            <p className="chat">{chat.content}</p>
            <span className="chatDate">{chat.messageDate}</span>
        </div>
    )
}