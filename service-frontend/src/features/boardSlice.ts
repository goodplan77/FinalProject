import { createSlice , PayloadAction} from "@reduxjs/toolkit";
import { Board, initialBoardList } from "../type/board";


let boardSlice = createSlice({
    name : 'board',
    initialState : initialBoardList,
    reducers : {
        selectAllBoard : (state, action:PayloadAction<Board[]>) => {
            return action.payload;
        }
    }
});

export const {selectAllBoard} = boardSlice.actions;
export default boardSlice.reducer;