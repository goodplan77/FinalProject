import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAlarmList, alarm } from "../type/alarm";


let alarmSlice = createSlice({
    name: 'alarm',
    initialState: initialAlarmList,
    reducers: {
        selectedAllAlarm: (state, action: PayloadAction<alarm[]>) => {
            return action.payload;
        },
        deleteSelectedAlarm: (state , action: PayloadAction<alarm>) => {
            return state.filter(alarm => alarm.alarmNo !== action.payload.alarmNo);
        }
    }
});

export const { selectedAllAlarm , deleteSelectedAlarm} = alarmSlice.actions;
export default alarmSlice.reducer;