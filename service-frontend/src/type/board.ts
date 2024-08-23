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


// 보드에 대한 기본값 설정
export const initialBoard:Board = {
    boardNo : 0,
    userNo : 0,
    title : '',
    content : '',
    boardCode : 'C',
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

export interface SearchKeyword {
    title: Board['title']
};
