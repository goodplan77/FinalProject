import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, initialBoardList } from "../type/board";

// 초기 상태에 전체 리스트와 필터링된 리스트를 분리
let initialState = {
    allBoards: initialBoardList,
    filteredBoards: [] as Board[],
};

let boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        selectAllBoard: (state, action: PayloadAction<Board[]>) => {
            state.allBoards = action.payload;
            state.filteredBoards = action.payload; // 모든 게시물을 필터링된 리스트에도 저장
        },
        selectCategoryBoard: (state, action: PayloadAction<string>) => {
            let category = '';
            switch(action.payload){
                case '일반': category = 'C'; break;
                case '중고': category = 'S'; break;
                case '분양': category = 'A'; break;
                case '실종': category = 'M'; break;
                default: 
                    state.filteredBoards = state.allBoards; // 카테고리에 해당하지 않으면 전체 게시물 반환
                    return;
            }

            state.filteredBoards = state.allBoards.filter((value) => {
                return value.boardCode === category;
            });
        }
    }
});

export const { selectAllBoard, selectCategoryBoard } = boardSlice.actions;
export default boardSlice.reducer;
