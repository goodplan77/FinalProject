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

export interface LoginResponse {
    token_type: string;
    access_token: string;
    expires_in: string;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
}

