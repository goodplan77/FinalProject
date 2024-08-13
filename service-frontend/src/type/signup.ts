export interface Signup{
    email : string
    code : number,
    userName : string
    nickName : string
    pwd : string
    phone : string
    address: string
}

export const initialSignup:Signup = {
    email : '',
    code : 0,
    userName : '',
    nickName : '',
    pwd : '',
    phone : '',
    address: ''
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