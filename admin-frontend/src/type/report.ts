export interface report {
   reportNo : number,
   userNo : number,
   category : string,
   content : string,
   reportDate : string,
   typeCode : string,
   refNo : number,
   nickName : string
}

export const initialReport: report = {
    reportNo : 0,
   userNo : 0,
   category : '',
   content : '',
   reportDate : '',
   typeCode : '',
   refNo : 0,
   nickName : ''
}

export const initialReportList: report[] = [];