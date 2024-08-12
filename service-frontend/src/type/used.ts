
export interface Used{

    boardNo : number,
    userNo : number,
    title : string,
    content : string,
    boardCode : string,
    enrollDate : string,
    modifyDate : string,
    views : number,
    status : string,
    detailStatus : string,
    likes : number

}

export const initialUsed:Used = {
    boardNo : 0,
    userNo : 0,
    title : '',
    content : '',
    boardCode : 'S',
    enrollDate : '',
    modifyDate : '',
    views : 0,
    status : 'Y',
    detailStatus : 'P',
    likes : 0
} as const;

export const initialUsedList:Used[] = [];