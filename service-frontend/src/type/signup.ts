export interface Address{
    postCode:string
    mainAddress: string,
    detailAddress:string,
}

export const initAddress:Address = {
    postCode:'',
    mainAddress: '',
    detailAddress:''
}

export interface Code{
    verificationCode : string
}

export const initCode:Code = {
    verificationCode : ''
} as const;

export interface User{
    email : string
    userName : string
    nickName : string
    pwd : string
    phone : string
    address: string
    birthday : string
}

export const initUser:User = {
    email : '',
    userName : '',
    nickName : '',
    pwd : '',
    phone : '',
    address: '',
    birthday : ''
} as const;



export type MenuType = 'kr'|'jp'|'ch';
export type MenuTaste = 'mild'|'hot';

export interface Menu{
    id : number,
    restaurant : string,
    name : string,
    price : number,
    type : MenuType,
    taste : MenuTaste
};

export const initialMenu:Menu ={
    id : 0,
    restaurant : '',
    name : '',
    price : 0,
    type : 'kr',
    taste : 'mild'
} as const;

export const initialMenuList:Menu[] = [];

export type SearchKeyword = {
    type: MenuType |'all'
    taste : MenuTaste|'all'
}