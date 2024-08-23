import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, initialBoard, initialBoardList } from "../type/board";

// 초기 상태에 전체 리스트와 필터링된 리스트를 분리
let initialState = {
    allBoards: initialBoardList,
    filteredBoards: [] as Board[],
    oneBoard : initialBoard
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
                case '실종': category = 'M'; break;
                case '분양': category = 'A'; break;
                default: 
                    state.filteredBoards = state.allBoards; // 카테고리에 해당하지 않으면 전체 게시물 반환
                    return;
            }

            state.filteredBoards = state.allBoards.filter((value) => {
                return value.boardCode === category;
            });
        },
        selectOneBoard:(state , action: PayloadAction<Board>) => {
            state.oneBoard = action.payload;
        }
    }
});

export const { selectAllBoard, selectCategoryBoard, selectOneBoard } = boardSlice.actions;
export default boardSlice.reducer;
