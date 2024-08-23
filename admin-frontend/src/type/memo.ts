export interface Memo {
    memoNo: number,
    userNo: number,
    content: string,
    targetDate: string
}

export const initialMemo: Memo = {
    memoNo: 0,
    userNo: 10,
    content: '',
    targetDate: ''
}

export const initMemoList: Memo[] = [];