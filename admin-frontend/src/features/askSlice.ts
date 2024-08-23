import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ask, initialAsk, initialAskList } from "../type/ask";

// 초기 상태에 전체 리스트와 필터링된 리스트를 분리
let initialState = {
    allAsks: initialAskList,
    filteredAsks: [] as ask[],
    oneAsk : initialAsk
};

let Askslice = createSlice({
    name: 'ask',
    initialState,
    reducers: {
        selectAllAsk: (state, action: PayloadAction<ask[]>) => {
            state.allAsks = action.payload;
            state.filteredAsks = action.payload; 
        },
        selectOneAsk:(state , action: PayloadAction<ask>) => {
            state.oneAsk = action.payload;
        }
    }
});

export const { selectAllAsk, selectOneAsk } = Askslice.actions;
export default Askslice.reducer;
