import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialReport, initialReportList, report } from "../type/report";

// 초기 상태에 전체 리스트와 필터링된 리스트를 분리
let initialState = {
    allreports: initialReportList,
    filteredReports: [] as report[],
    oneReport : initialReport
};

let Reportslice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        selectAllReport: (state, action: PayloadAction<report[]>) => {
            state.allreports = action.payload;
            state.filteredReports = action.payload; 
        },
        selectCategory: (state, action: PayloadAction<string>) => {
            if(action.payload == '전체'){
                state.filteredReports = state.allreports;   // 카테고리에 해당하지 않으면 전체 목록 반환
            } else {
                state.filteredReports = state.allreports.filter((value) => {
                    return value.category === action.payload;
                });
            }
        },
        selectReportType: (state, action: PayloadAction<string>) => {
            if(action.payload == '전체'){
                state.filteredReports = state.allreports;   // 카테고리에 해당하지 않으면 전체 목록 반환
            } else {
                state.filteredReports = state.allreports.filter((value) => {
                    return value.typeCode === action.payload;
                });
            }
        },
        selectOneReport:(state , action: PayloadAction<report>) => {
            state.oneReport = action.payload;
        }
    }
});

export const { selectAllReport, selectCategory , selectReportType , selectOneReport } = Reportslice.actions;
export default Reportslice.reducer;
