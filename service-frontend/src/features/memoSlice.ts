import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initMemoList, Memo } from "../type/memo";



let memoSlice = createSlice({
    name: 'board',
    initialState: initMemoList,
    reducers: {
        selectedMemo: (state, action: PayloadAction<Memo[]>) => {
            return action.payload;
        }
    }
});

export const { selectedMemo } = memoSlice.actions;
export default memoSlice.reducer;