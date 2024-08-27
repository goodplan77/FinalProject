import { User } from "../../type/user";

export default function ChatRoomUser({ chatRoomUser }: { chatRoomUser: User[] }) {
    return (
        <div>
            {
                chatRoomUser.map(user => {
                    return (
                        <h3 key={user.userNo}>{user.nickName}</h3>
                    )
                })
            }
        </div>
    )
}