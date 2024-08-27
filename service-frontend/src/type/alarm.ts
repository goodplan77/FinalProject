export interface alarm {
    alarmNo : number,
    userNo : number,
    fromUserNo : number,
    content : string,
    status : string,
    alaramDate : string,
    typeCode : string,
    refNo : number
}

export const initialAlarm: alarm = {
    alarmNo : 0,
    userNo : 0,
    fromUserNo : 0,
    content : '',
    status : '',
    alaramDate : '',
    typeCode : '',
    refNo : 0
}

export const initialAlarmList: alarm[] = [];