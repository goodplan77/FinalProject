import { useNavigate } from 'react-router-dom';
import style from './Headerbar.module.css';
export default function Headerbar(){

    const navi = useNavigate();

    return(
        <div className={style.container}>
            <div className={style.back}>
                <img className={style.backImg} src="/images/back-arrow.png" alt="뒤로가기" />
            </div>
            <div className={style.logo} onClick={()=>navi('/d')}>
                <img className={style.logoImg} src='/images/logo.png' alt='메인 로고'/>
                <h4>반주 한상</h4>
            </div>
            <div className={style.search}>
                <img className={style.searchImg} src='/images/search.png' alt='검색 버튼'/>
            </div>
        </div>
    )
}