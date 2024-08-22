export interface Report {
    reportNo: number,
    userNo: number,
    catrgory: String,
    content: String,
    typeCode: String,
    refNo: number
}

export const initialReport: Report = {
    reportNo: 0,
    userNo: 0,
    catrgory: '',
    content: '',
    typeCode: '',
    refNo: 0
}

export const initialReportList: Report[] = [];