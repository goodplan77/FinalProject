export interface adminUser{
    userNo : number,
    email : string,
    pwd : string,
    userName : string,
    nickName : string,
    phone : string,
    address : string,
    status : string, 
    enrollDate : string
}

export const initAdminUser:adminUser = {
    userNo : 0,
    email : '',
    pwd : '',
    userName : '',
    nickName : '',
    phone : '',
    address : '',
    status : '', 
    enrollDate : ''
} as const;

export interface LoginData {
    email: string;
    pwd: string;
}

export const initLoginData: LoginData = {
    email: '',
    pwd: ''
};