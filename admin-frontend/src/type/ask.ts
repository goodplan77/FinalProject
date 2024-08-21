export interface ask {
    askNo: number,
    userNo: number,
    content: string,
    title: string
}

export const initialAsk: ask = {
    askNo: 0,
    userNo: 0,
    content: '',
    title: ''
}

export const initialAskList: ask[] = [];