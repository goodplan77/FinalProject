import { createSlice } from '@reduxjs/toolkit';

const alarmSlice = createSlice({
    name: 'alarm',
    initialState: {
        askCount: 0,
        reportCount: 0,
    },
    reducers: {
        setAskCount: (state, action) => {
            state.askCount = action.payload;
        },
        setReportCount: (state, action) => {
            state.reportCount = action.payload;
        },
        incrementAskCount: (state) => {
            state.askCount += 1;
        },
        incrementReportCount: (state) => {
            state.reportCount += 1;
        },
        decrementAskCount: (state) => {
            state.askCount -= 1;
        },
        decrementReportCount: (state) => {
            state.reportCount -= 1;
        },
    },
});

export const { setAskCount, setReportCount, incrementAskCount, incrementReportCount, decrementAskCount, decrementReportCount } = alarmSlice.actions;
export default alarmSlice.reducer;
