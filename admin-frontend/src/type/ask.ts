export interface ask {
    userNo : number;
    askNo : number;
    title : string;
	content : string;
	resContent : string;
	status : string; // Y - 답변완료 N - 미완료
	askDate : string; // 일단 String
	resDate : string; // 일단 String
    nickName : string;
}

export const initialAsk: ask = {
    userNo : 0,
    askNo : 0,
    title : '',
	content : '',
	resContent : '',
	status : 'N',
	askDate : '',
	resDate : '',
    nickName : ''
}

export const initialAskList: ask[] = [];