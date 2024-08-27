import { User } from "./user"

export type ChatRoom = {
    chatRoomNo : number,
    fromUserNo : number,
    fromStatus : string,
    toUserNo : number,
    toStatus : string
    toNickName : string,
    fromNickName : string
}

export type Message = {
    messageNo : number,
    chatRoomNo : number,
    userNo : number,
    content : string,
    messageDate : string,

    user : User
}