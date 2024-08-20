

// 보드에다가 쓸 타입변수들
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
    likes : number,

    nickName : string,

    boardImg : BoardImg[]

    comment : Comment[]
    // 전부다 필수 값이다.
}

// 보드 이미지 타입 지정
export interface BoardImg{
    boardNo : number,
    changeName : string,
    imgNo : number,
    originName : string
}

// 보드 댓글 타입 지정
export interface Comment{
    commentNo : number,
    boardNo : number,
    userNo : number,
    content : string,
    commentData : string,
    modifyDate : string,
    status : string,
    refNo : number
}

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
    imgUser : ImgUser,

    dogs : Dog[],
    historyList : History[],
    likeList : Like[],
    memoList : Memo[]
}

export interface ImgUser{
    userNo : number,
    originName : string,
    changeName : string
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

export interface ImgDog{
    dogNo : number,
    originName : string,
    changeName : string
}

export interface History{
    historyNo : number,
    userNo : number,
    point : number,
    pointDate : string,
    content : string
}

export interface Like{
    likeNo : number,
    userNo : number,
    typeCode : string,
    refNo : number
}

export interface Memo{
    memoNo : number,
    userNo : number,
    content : string,
    targetDate : string
}


// 보드에 대한 기본값 설정
export const initialBoard:Board = {
    boardNo : 0,
    userNo : 0,
    title : '',
    content : '',
    boardCode : '',
    enrollDate : '',
    modifyDate : '',
    views : 0,
    status : '',
    detailStatus : '',
    likes : 0,

    nickName : '',

    boardImg : [],
    comment : []
};

// 내보내기
export const initialBoardList:Board[] = [];