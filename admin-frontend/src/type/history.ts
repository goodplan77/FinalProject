export interface History{
    historyNo : number,
    userNo : number,
    point : number,
    pointDate : string,
    content : string
}

export const initHistory:History = {
    historyNo : 0,
    userNo : 10,
    point : 0,
    pointDate : '',
    content : ''
}

export const initHistoryList:History[] = [];