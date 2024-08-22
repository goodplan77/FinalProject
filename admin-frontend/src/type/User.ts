import { Dog, initDogList } from "./dog";
import { History, initHistoryList } from "./history";
import { initLikeList, Like } from "./like";
import { initMemoList, Memo } from "./memo";

export interface ImgUser{
    userNo : number,
    originName : string,
    changeName : string
}

export const initImgUser:ImgUser = {
    userNo : 10,
    originName : '',
    changeName : ''
}

export interface User{
    userNo : number,
    email : string,
    pwd : string,
    userName : string,
    nickName : string,
    phone : string,
    address : string,
    status : string, 
    points : number,
    enrollDate : string,
    modifyDate : string,
    imgUser : ImgUser,

    dogs : Dog[],
    historyList : History[],
    likeList : Like[],
    memoList : Memo[]
}

export const initUser:User = {
    userNo : 10,
    email : '',
    pwd : '',
    userName : '',
    nickName : '',
    phone : '',
    address : '',
    status : '', 
    points : 0,
    enrollDate : '',
    modifyDate : '',
    imgUser : initImgUser,

    dogs : initDogList,
    historyList : initHistoryList,
    likeList : initLikeList,
    memoList : initMemoList
} as const;

export const initialUserList:User[] = [];