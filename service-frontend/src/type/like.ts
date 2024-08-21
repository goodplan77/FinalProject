export interface Like{
    likeNo : number,
    userNo : number,
    typeCode : string,
    refNo : number
}

export const initLike:Like = {
    likeNo : 0,
    userNo : 10,
    typeCode : '',
    refNo : 0
}

export const initLikeList:Like[] = [];