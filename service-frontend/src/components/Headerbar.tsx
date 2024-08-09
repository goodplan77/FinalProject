import { useNavigate } from 'react-router-dom';
import style from './Headerbar.module.css';
export default function Headerbar(){

    const navi = useNavigate();

    return(
        <div className={style.container}>
            <div className={style.back} onClick={()=>navi(-1)}>
                <img className={style.backImg} src="/images/back-arrow.png" alt="뒤로가기" />
            </div>
            <div className={style.logo} >
                <img className={style.logoImg} src='/images/logo.png' alt='메인 로고' onClick={()=>navi('/d')}/>
                <h3 onClick={()=>navi('/d')}>반주 한상</h3>
            </div>
            <div className={style.button}>
                <img className={style.alarmImg} src='/images/alarm.png' alt='알림 버튼' onClick={()=>navi('/')}/>
                <img className={style.searchImg} src='/images/search.png' alt='검색 버튼'/>
            </div>
        </div>
    )
}