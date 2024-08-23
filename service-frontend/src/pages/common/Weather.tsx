import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { xyConvert } from '../../lib';
import styles from './styles/Weather.module.css';

// 위치 정보를 나타내는 인터페이스
interface Location {
    lat: number;
    lon: number;
}

// 날씨 데이터를 나타내는 인터페이스
interface WeatherData {
    temperature: number | null;
    rainfall: number | null;
    humidity: number | null;
    precipitationType: string;
    windDirection: number | null;
    windSpeed: number | null;
    skyText: string;
    weatherImage: string;
}

// 날씨 컴포넌트
export default function Weather() {
    const [location, setLocation] = useState<Location | null>(null);
    const [locationName, setLocationName] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData>({
        temperature: null,
        rainfall: null,
        humidity: null,
        precipitationType: '',
        windDirection: null,
        windSpeed: null,
        skyText: '',
        weatherImage: 'unknown',
    });

    const serviceKey = process.env.REACT_APP_Weather_API_ServiceKey;
    const kakaoMapApiKey = process.env.REACT_APP_KAKAO_MAP_KEY as string;

    // 위치 정보
    useEffect(() => {
        const loadKakaoMapScript = () => {
            return new Promise<void>((resolve, reject) => {
                if (window.kakao && window.kakao.maps) {
                    resolve();
                } else {
                    const script = document.createElement('script');
                    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false&libraries=services`;
                    script.onload = () => {
                        window.kakao.maps.load(resolve);
                    };
                    script.onerror = () => reject(new Error('Kakao Maps API 스크립트 로드 실패'));
                    document.head.appendChild(script);
                }
            });
        };

        // 사용자 위치 정보
        const getLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLocation({ lat: latitude, lon: longitude });

                    try {
                        await loadKakaoMapScript();

                        if (window.kakao?.maps?.services) {
                            const geocoder = new window.kakao.maps.services.Geocoder();
                            const coords = new window.kakao.maps.LatLng(latitude, longitude);

                            // 경도 위도 지역이름 변환
                            geocoder.coord2RegionCode(longitude, latitude, (result: any, status: any) => {
                                if (status === window.kakao.maps.services.Status.OK && result[0]) {
                                    setLocationName(result[0].address_name);
                                } else {
                                    console.error('지역명을 가져오지 못했습니다.');
                                }
                            });
                        }
                    } catch (error) {
                        console.error('Kakao Maps API 로드 중 오류 발생:', error);
                    }
                }, (error) => {
                    console.error('Geolocation 오류:', error);
                });
            } else {
                console.error('Geolocation을 지원하지 않는 브라우저입니다.');
            }
        };

        getLocation();
    }, [kakaoMapApiKey]);

    useEffect(() => {
        if (location) {
            const fetchWeatherData = async () => {
                const { lat, lon } = location;
                const { x: nx, y: ny } = xyConvert(lat, lon);

                // 시간에 따른 예보 시간 지정
                const calculateBaseTime = (hour: number): string => {
                    const times = [
                        { hour: 2, baseTime: '2300' },
                        { hour: 5, baseTime: '0200' },
                        { hour: 8, baseTime: '0500' },
                        { hour: 11, baseTime: '0800' },
                        { hour: 14, baseTime: '1100' },
                        { hour: 17, baseTime: '1400' },
                        { hour: 20, baseTime: '1700' },
                        { hour: 23, baseTime: '2000' },
                    ];
                    return times.find(t => hour < t.hour)?.baseTime || '2300';
                };

                // 주야간
                const isDaytime = (hour: number): boolean => {
                    return hour >= 6 && hour < 18;
                };

                const currentDate = new Date();
                const currentHour = currentDate.getHours();
                const baseTime = calculateBaseTime(currentHour);
                const baseDate = currentDate.toISOString().split('T')[0].replace(/-/g, '');

                try {
                    const response = await $.getJSON(
                        `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`,
                        {
                            serviceKey,
                            pageNo: 1,
                            numOfRows: 1000,
                            dataType: 'JSON',
                            base_date: baseDate,
                            base_time: baseTime,
                            nx,
                            ny,
                        }
                    );

                    const items = response.response.body.items.item;
                    let currentSky = '';
                    let currentPrecipitationType = '';

                    // 날씨 데이터
                    items.forEach((item: any) => {
                        const value = parseFloat(item.obsrValue);

                        switch (item.category) {
                            case "T1H":
                                weatherData.temperature = value;
                                break;
                            case "RN1":
                                weatherData.rainfall = value;
                                break;
                            case "REH":
                                weatherData.humidity = value;
                                break;
                            case "PTY": {
                                let ptyText = '';
                                switch (value) {
                                    case 0:
                                        ptyText = '맑음';
                                        break;
                                    case 1:
                                        ptyText = '비';
                                        break;
                                    case 2:
                                        ptyText = '비/눈';
                                        break;
                                    case 3:
                                        ptyText = '눈';
                                        break;
                                    case 5:
                                        ptyText = '빗방울';
                                        break;
                                    case 6:
                                        ptyText = '빗방울눈날림';
                                        break;
                                    case 7:
                                        ptyText = '눈날림';
                                        break;
                                    case 4:
                                        ptyText = '소나기';
                                        break;
                                    default:
                                        ptyText = '알 수 없음';
                                }
                                currentPrecipitationType = ptyText;
                                weatherData.precipitationType = ptyText;
                                break;
                            }
                            case "VEC":
                                weatherData.windDirection = value;
                                break;
                            case "WSD":
                                weatherData.windSpeed = value;
                                break;
                            case "SKY": {
                                let skyText = '';
                                switch (value) {
                                    case 1:
                                        skyText = '맑음';
                                        break;
                                    case 3:
                                        skyText = '구름많음';
                                        break;
                                    case 4:
                                        skyText = '흐림';
                                        break;
                                    default:
                                        skyText = '알 수 없음';
                                }
                                currentSky = skyText;
                                weatherData.skyText = skyText;
                                break;
                            }
                        }
                    });

                    // 이미지 매칭 로직
                    const isDay = isDaytime(currentHour);
                    const timePrefix = isDay ? '' : 'nt_';

                    if (currentPrecipitationType === '알 수 없음') {
                        switch (currentSky) {
                            case '맑음':
                                weatherData.weatherImage = `${timePrefix}clear`;
                                break;
                            case '구름많음':
                                weatherData.weatherImage = `${timePrefix}partlycloudy`;
                                break;
                            case '흐림':
                                weatherData.weatherImage = `${timePrefix}cloudy`;
                                break;
                            default:
                                weatherData.weatherImage = `${timePrefix}clear`;
                        }
                    } else {
                        switch (currentPrecipitationType) {
                            case '비':
                            case '빗방울':
                                weatherData.weatherImage = `${timePrefix}rain`;
                                break;
                            case '비/눈':
                            case '빗방울눈날림':
                                weatherData.weatherImage = `${timePrefix}sleet`;
                                break;
                            case '눈':
                            case '눈날림':
                                weatherData.weatherImage = `${timePrefix}snow`;
                                break;
                            case '소나기':
                                weatherData.weatherImage = `${timePrefix}tstorms`;
                                break;
                            default:
                                weatherData.weatherImage = `${timePrefix}clear`;
                        }
                    }

                    setWeatherData({ ...weatherData });

                } catch (error) {
                    console.error('날씨 데이터 로드 중 오류 발생:', error);
                }
            };

            fetchWeatherData();
        }
    }, [location, serviceKey]);

    return (
        <div className={styles.container}>
            <MainWeatherDisplay
                weatherImage={weatherData.weatherImage}
                temperature={weatherData.temperature}
                precipitationType={weatherData.precipitationType}
                skyText={weatherData.skyText}
            />
            <WeatherDetails
                temperature={weatherData.temperature}
                humidity={weatherData.humidity}
                rainfall={weatherData.rainfall}
                windSpeed={weatherData.windSpeed}
                windDirection={weatherData.windDirection}
            />
            <LocationDisplay locationName={locationName} />
        </div>
    );
}

function MainWeatherDisplay({ weatherImage, temperature, precipitationType, skyText }: { weatherImage: string, temperature: number | null, precipitationType: string, skyText: string }) {
    return (
        <div className={styles.main}>
            <img src={`/images/weatherImg/${weatherImage}.png`} alt="Weather" className={styles.icon} />
            <div className={styles.temperature}>
                {temperature !== null ? `${temperature.toFixed(1)}°C` : '--'}
            </div>
            <div className={styles.description}>
                {precipitationType ? precipitationType : '정보 없음'} {skyText ? skyText : ''}
            </div>
        </div>
    );
}

interface WeatherDetailsProps {
    temperature: number | null;
    humidity: number | null;
    rainfall: number | null;
    windSpeed: number | null;
    windDirection: number | null;
}

function WeatherDetails({ temperature, humidity, rainfall, windSpeed, windDirection }: WeatherDetailsProps) {
    return (
        <div className={styles.details}>
            <DetailItem label="체감" value={temperature !== null ? `${(temperature - 0.5).toFixed(1)}°C` : '--'} />
            <DetailItem label="습도" value={humidity !== null ? `${humidity}%` : '--'} />
            <DetailItem label="강수량" value={rainfall !== null ? `${rainfall} mm` : '--'} />
            <DetailItem label="풍속" value={windSpeed !== null ? `${windSpeed} m/s` : '--'} />
            <DetailItem label="풍향" value={windDirection !== null ? `${windDirection}°` : '--'} />
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value: string }) {
    return (
        <div className={styles.detailItem}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    );
}

function LocationDisplay({ locationName }: { locationName: string }) {
    return (
        <div className={styles.location}>
            <span>{locationName || '위치 정보 없음'}</span>
        </div>
    );
}