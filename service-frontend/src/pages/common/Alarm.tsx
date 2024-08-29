import { useSelector } from 'react-redux';
import styles from './styles/Alarm.module.css';
import { RootState } from '../../store/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alarm } from '../../type/alarm';
import { deleteSelectedAlarm } from '../../features/alarmSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Alarm() {

    const navi = useNavigate();
    const dispatch = useDispatch();
    const alarm = useSelector((state:RootState) => state.alarm);
    const [alarmList , setAlarmList] = useState(alarm);
    useEffect(() => {
        setAlarmList(alarm);
    },[alarm])

    const readAlarm = (e:React.MouseEvent<HTMLDivElement> , alarm:alarm) => {
        axios.post(`http://localhost:8013/banju/alarm/updateReadStatus/${alarm.userNo}/${alarm.typeCode}/${alarm.refNo}`)
                .then((response) => {
                    console.log(response.data);
                    switch(alarm.typeCode){
                        case 'B' : 
                        case 'L' : 
                        case 'C' : 
                            navi(`/boardDetail/${alarm.refNo}`);
                            break;
                        case 'M' : break;
                        case 'R' : break;
                        case 'P' : break;
                            default: break;
                    }
                    dispatch(deleteSelectedAlarm(alarm));
                })
                .catch((error) =>{
                    console.log(error.response.data);
                })
        
    }

    return (
        <>
            <div className={styles.container}>
                {alarmList.map((alarm, index) => (
                    <div key={index} className={styles.notificationItem} onClick={(e) =>{readAlarm(e,alarm)}}>
                        <div className={styles.notificationText}>
                            <span>{alarm.fromUserNickName}{alarm.content}</span>
                            <span className={styles.date}>{alarm.alaramDate}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}