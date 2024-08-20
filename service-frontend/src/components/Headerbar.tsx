import { useNavigate } from 'react-router-dom';
import style from './Headerbar.module.css';
import { getCookie } from '../utils/Cookie';
import { url } from 'inspector';
import { data } from 'jquery';
import axios from '../utils/CustomAxios';
export default function Headerbar(){

    const navi = useNavigate();

    const test = ()=>{
        const data = {
            accessToken : getCookie("accessToken")
        }
        axios.post("http://localhost:8013/banju/user/test")
            .then(res=>{
                console.log(res);
            })
    }

    return(
        <div className={style.container}>
            <div className={style.back} onClick={() => navi(-1)}>
                <img className={style.backImg} src="/images/back-arrow.png" alt="뒤로가기" />
            </div>
            <div className={style.logo} >
                <img className={style.logoImg} src='/images/logo.png' alt='메인 로고' onClick={test}/>
                <h3 onClick={()=>navi('/d')}>반주 한상</h3>
            </div>
            <div className={style.button}>
                <img className={style.alarmImg} src='/images/alarm.png' alt='알림 버튼' onClick={() => navi('/alarm')} />
                <img className={style.searchImg} src='/images/search.png' alt='검색 버튼' onClick={() => navi('/search')} />
            </div>
        </div>
    )
}