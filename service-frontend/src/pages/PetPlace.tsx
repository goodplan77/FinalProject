import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/PetPlace.module.css';
import useGeolocation from '../hook/useGeolocation';

declare global {
    interface Window {
        kakao: any;
    }
}

export default function PetPlace() {
    const location = useGeolocation();
    const [map, setMap] = useState<any>(null);
    const [markers, setMarkers] = useState<any[]>([]);
    const [keywordInput, setKeywordInput] = useState('');
    const navi = useNavigate();

    useEffect(() => {
        const kakaoMapApiKey = process.env.REACT_APP_KAKAO_MAP_KEY as string;

        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false&libraries=services`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    if (location.loaded && location.coordinates) {
                        const container = document.getElementById("map");
                        const options = {
                            center: new window.kakao.maps.LatLng(location.coordinates.lat, location.coordinates.lng),
                            level: 3,
                        };
                        setMap(new window.kakao.maps.Map(container, options));
                    }
                });
            }
        };

        script.onerror = () => {
            console.error("Kakao Maps script failed to load.");
        };

        // Clean up script if needed
        return () => {
            document.head.removeChild(script);
        };
    }, [location]);

    const serarchReset = () => {
        clearMarkers();  // 기존 마커 제거
    };

    const serarchHospital = () => {
        if (map) {
            const places = new window.kakao.maps.services.Places(map);
            places.categorySearch('HP8', placesSearchCB, { useMapBounds: true });
        }
    };

    const serarchCafe = () => {
        if (map) {
            const places = new window.kakao.maps.services.Places(map);
            places.categorySearch('CE7', placesSearchCB, { useMapBounds: true });
        }
    };

    const serarchFood = () => {
        if (map) {
            const places = new window.kakao.maps.services.Places(map);
            places.categorySearch('FD6', placesSearchCB, { useMapBounds: true });
        }
    };

    const placesSearchCB = (data: any, status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
            clearMarkers();  // 기존 마커 제거
            const newMarkers = data.map((place: any) => {
                const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: markerPosition,
                });

                var infowindow = new window.kakao.maps.InfoWindow({
                    position: new window.kakao.maps.LatLng(place.y, place.x),
                    content: `<div class="${styles.mapPlace}">
                                <div class="${styles.mapPlaceTitle}">${place.place_name}</div>
                                <div class="${styles.mapPlaceAddress}">${place.address_name}</div>
                                <div class="${styles.mapPlacePhone}">${place.phone ? `전화번호: ${place.phone}` : '전화번호 정보 없음'}</div>
                              </div>`
                });

                infowindow.open(map, marker);
                return { marker, infowindow };
            });
            setMarkers(newMarkers);
        }
    };

    function clearMarkers() {
        markers.forEach((marker) => {
            marker.marker.setMap(null);
            marker.infowindow.close();
        });
        setMarkers([]);
    }

    const serarchKeyword = () => {
        if (map) {
            const places = new window.kakao.maps.services.Places(map);
            places.keywordSearch(keywordInput, placesSearchCB, { useMapBounds: true });
            setKeywordInput('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            serarchKeyword();
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.map} id="map"></div>

                <div className={styles.searchContainer}>
                    <input
                        className={styles.searchInput}
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        placeholder="장소를 검색하세요"
                        onKeyPress={handleKeyPress}
                    />
                    <div className={styles.searchIcon} onClick={serarchKeyword}></div>
                </div>

                <div className={styles.categoryButtons}>
                    <div className={styles.categoryButton} onClick={serarchReset}>초기화</div>
                    <div className={styles.categoryButton} onClick={serarchHospital}>병원</div>
                    <div className={styles.categoryButton} onClick={serarchCafe}>카페</div>
                    <div className={styles.categoryButton} onClick={serarchFood}>음식점</div>
                </div>
            </div>
        </>
    );
}
