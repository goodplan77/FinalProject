import { useNavigate } from 'react-router-dom';
import style from './styles/Headerbar.module.css';
import { getCookie } from '../utils/Cookie';
import { url } from 'inspector';
import { data } from 'jquery';
import axios from '../utils/CustomAxios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectedAllAlarm } from '../features/alarmSlice';
export default function Headerbar() {

    const navi = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const alarm = useSelector((state:RootState) => state.alarm);

    useEffect(() => {
        if(user.userNo && user.userNo != 10){
            console.log('환영합니다')
            const fetchInitialUnReadList = () => {
                axios.get(`http://localhost:8013/banju/alarm/unReadList/${user.userNo}`)
                    .then((response) => {
                        dispatch(selectedAllAlarm(response.data.list));
                        console.log(alarm);
                    })
                    .catch((error) => {
                        console.error("Error fetching unread alarms:", error);
                    });
            };
        
            const createEventSource = () => {
                console.log('연결?');
                const eventSource = new EventSource(`http://localhost:8013/banju/alarm/subscribe/${user.userNo}`);
                eventSource.addEventListener('alarm', (event) => {
                    console.log(event);
                });
            
                eventSource.onerror = (event) => {
                    console.error("SSE connection error", event);
                    eventSource.close();
            
                    // 일정 시간 후 재연결 시도
                    setTimeout(() => {
                        createEventSource(); // 재연결 시도 시 새로운 EventSource 생성
                    }, 3000); // 3초 후 재연결 시도
                };
            
                return eventSource;
            };
        
            fetchInitialUnReadList(); // 초기 로드 시 읽지 않은 알림 목록을 한 번 가져옴
            const eventSource = createEventSource(); // SSE 연결 생성
            return () => {
                eventSource.close(); // 컴포넌트 언마운트 시 SSE 연결 종료
            };
        }
        
    }, [user]);

    const test = () => {
        const data = {
            accessToken: getCookie("accessToken")
        }
        axios.post("http://localhost:8013/banju/user/test")
            .then(res => {
                console.log(res);
            })
    };

    return (
        <div className={style.container}>
            <div className={style.back} onClick={() => navi(-1)}>
                <img className={style.backImg} src="/images/back-arrow.png" alt="뒤로가기" />
            </div>
            <div className={style.logo} >
                <img className={style.logoImg} src='/images/logo.png' alt='메인 로고' onClick={test} />
                <h3 onClick={() => navi('/')}>반주 한상</h3>
            </div>
            <div className={style.button}>
                <img className={style.alarmImg} src={alarm.length>0 ? '/images/hasAlarm.png' : '/images/alarm.png'} alt='알림 버튼' onClick={() => navi('/alarm')} />
                <img className={style.searchImg} src='/images/search.png' alt='검색 버튼' onClick={() => navi('/search')} />
            </div>
        </div>
    )
}