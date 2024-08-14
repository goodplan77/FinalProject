export interface Board{
    // vo 클래스를 그대로 적으면 된다.
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
    // 전부다 필수 값이다.
}

export const initialBoard:Board = {
    boardNo : 0,
    userNo : 0,
    title : '',
    content : '',
    boardCode : 'C',
    enrollDate : '',
    modifyDate : '',
    views : 0,
    status : 'Y',
    detailStatus : 'P',
    likes : 0
} as const;

export const initialBoardList:Board[] = [];