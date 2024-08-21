import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAskList, ask } from "../type/ask";


let askSlice = createSlice({
    name: 'ask',
    initialState: initialAskList,
    reducers: {
        selectedAsk: (state, action: PayloadAction<ask[]>) => {
            return action.payload;
        }
    }
});

export const { selectedAsk } = askSlice.actions;
export default askSlice.reducer;