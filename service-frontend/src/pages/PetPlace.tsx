import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './css/PetPlace.module.css';
import useGeolocation from '../hook/useGeolocation';


declare global {
    interface Window {
      kakao: any;
    }
}

export default function PetPlace (){

    const location = useGeolocation();

    // 컴포넌트 마운트시 실행
    useEffect(() => {
        // js 헤더에 초기 카카오 맵 설정 요청
        const script = document.createElement("script");
        script.async = true;
        
        const kakaoMapApiKey = process.env.REACT_APP_KAKAO_MAP_KEY as string;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false&`;
        document.head.appendChild(script);

        // 스크립트 로드시 맵 불러오기
        script.onload = () => {
            // 카카오 맵 로드 성공시
            if(window.kakao && window.kakao.maps){
                window.kakao.maps.load(() => {
                    if (location.loaded && location.coordinates){
                        const container = document.getElementById("map");    
                        const options = {
                        center: new window.kakao.maps.LatLng(location.coordinates.lat , location.coordinates.lng), // 초기 중심 좌표 (위도, 경도)
                        level: 2, // 지도 확대 레벨
                        };
                        
                        let markerPosition  = new window.kakao.maps.LatLng(location.coordinates.lat , location.coordinates.lng);
                        let marker = new window.kakao.maps.Marker({
                            position:markerPosition
                        });
                        
                        marker.setMap(new window.kakao.maps.Map(container, options));
                    }
                });
            }
        }

      }, [location]);

      

    const navi = useNavigate();

    return (
        <>
            <div id="map" style={{width : "100%" , height : "800px"}}></div>

            <div className={styles.mainNavi}>
                <div className={styles.naviHome} onClick={() => navi('/')}>
                    <img className={styles.home} src={`${process.env.PUBLIC_URL}/images/home.png`} alt="back" />
                </div>
                <div className={styles.naviHam}>
                    <img className={styles.ham} src={`${process.env.PUBLIC_URL}/images/ham.png`} alt="back" />
                </div>
                <div className={styles.naviChat}>
                    <img className={styles.chat} src={`${process.env.PUBLIC_URL}/images/message.png`} alt="back" />
                </div>
                <div className={styles.naviMy} onClick={() => navi('/mypage')}>
                    <img className={styles.my} src={`${process.env.PUBLIC_URL}/images/myPage.png`} alt="back" />
                </div>
            </div>
        </>
    )
}