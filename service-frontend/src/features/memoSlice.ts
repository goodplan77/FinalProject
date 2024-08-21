import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialMemoList, Memo } from "../type/memo";



let memoSlice = createSlice({
    name: 'board',
    initialState: initialMemoList,
    reducers: {
        selectedMemo: (state, action: PayloadAction<Memo[]>) => {
            return action.payload;
        }
    }
});

export const { selectedMemo } = memoSlice.actions;
export default memoSlice.reducer;