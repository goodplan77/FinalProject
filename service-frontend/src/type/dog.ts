export interface ImgDog{
    dogNo : number,
    originName : string,
    changeName : string
}

export const initImgDog:ImgDog = {
    dogNo : 0,
    originName : '',
    changeName : ''
}

export interface Dog{
    dogNo : number,
    userNo : number,
    isMain : string,
    dogName : string,
    breed : string,
    gender : string,
    birthday : string,
    note : string,
    imgDog : ImgDog
}

export const initDog:Dog = {
    dogNo : 0,
    userNo : 0,
    isMain : '',
    dogName : '',
    breed : '',
    gender : '',
    birthday : '',
    note : '',
    imgDog : initImgDog
} as const;

export const initDogList:Dog[] = [];