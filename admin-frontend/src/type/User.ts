export interface User{
    userNo : number,
    grade : string,
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
    userSsn : string,
}

export const initialUser:User = {
    userNo : 0,
    grade : '',
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
    userSsn : '',
} as const;

export const initialUserList:User[] = [];