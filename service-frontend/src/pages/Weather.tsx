import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { xyConvert } from '../lib';
import styles from './css/Weather.module.css';

export default function Weather() {
    const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [rainfall, setRainfall] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [precipitationType, setPrecipitationType] = useState<string>('');
    const [windDirection, setWindDirection] = useState<number | null>(null);
    const [windSpeed, setWindSpeed] = useState<number | null>(null);
    const [skyText, setSkyText] = useState<string>('');
    const [weatherImage, setWeatherImage] = useState<string>('unknown');
    const serviceKey = process.env.REACT_APP_Weather_API_ServiceKey;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLocation({ lat: latitude, lon: longitude });
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        if (location) {
            const { lat, lon } = location;
            const { x: nx, y: ny } = xyConvert(lat, lon);

            const calculateBaseTime = (hour: number): string => {
                if (hour < 2) return '2300';
                if (hour < 5) return '0200';
                if (hour < 8) return '0500';
                if (hour < 11) return '0800';
                if (hour < 14) return '1100';
                if (hour < 17) return '1400';
                if (hour < 20) return '1700';
                if (hour < 23) return '2000';
                return '2300';
            };

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
            const currentDay = String(currentDate.getDate()).padStart(2, '0');
            const currentHour = currentDate.getHours();

            const baseTime = calculateBaseTime(currentHour);
            const baseDate = `${currentYear}${currentMonth}${currentDay}`;

            $.getJSON(
                `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`,
                function (data) {
                    const items = data.response.body.items.item;
                    let currentSky = '';
                    let currentPrecipitationType = '';

                    items.forEach((item: any) => {
                        const value = parseFloat(item.obsrValue);  // 문자열을 숫자로 변환

                        switch (item.category) {
                            case "T1H":
                                setTemperature(value);
                                break;
                            case "RN1":
                                setRainfall(value);
                                break;
                            case "REH":
                                setHumidity(value);
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
                                setPrecipitationType(ptyText);
                                break;
                            }
                            case "VEC":
                                setWindDirection(value);
                                break;
                            case "WSD":
                                setWindSpeed(value);
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
                                setSkyText(skyText);
                                break;
                            }
                            default:
                                break;
                        }
                    });

                    // 이미지 매칭 로직 추가
                    if (currentPrecipitationType === '맑음') {
                        switch (currentSky) {
                            case '맑음':
                                setWeatherImage('sunny');
                                break;
                            case '구름많음':
                                setWeatherImage('partlycloudy');
                                break;
                            case '흐림':
                                setWeatherImage('cloudy');
                                break;
                            default:
                                setWeatherImage('sunny');
                        }
                    } else {
                        switch (currentPrecipitationType) {
                            case '비':
                            case '빗방울':
                                setWeatherImage('rain');
                                break;
                            case '비/눈':
                            case '빗방울눈날림':
                                setWeatherImage('sleet');
                                break;
                            case '눈':
                            case '눈날림':
                                setWeatherImage('snow');
                                break;
                            case '소나기':
                                setWeatherImage('tstorms');
                                break;
                            default:
                                setWeatherImage('sunny');
                        }
                    }
                }
            );
        }
    }, [location]);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <img src={`/images/weatherImg/${weatherImage}.png`} alt="Weather" className={styles.icon} />
                <div className={styles.temperature}>
                    {temperature !== null ? `${temperature.toFixed(1)}°C` : '--'}
                </div>
                <div className={styles.description}>
                    {precipitationType ? precipitationType : '정보 없음'}
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.detailItem}>
                    <span>체감</span>
                    <span>{temperature !== null ? `${(temperature - 0.5).toFixed(1)}°C` : '--'}</span>
                </div>
                <div className={styles.detailItem}>
                    <span>습도</span>
                    <span>{humidity !== null ? `${humidity}%` : '--'}</span>
                </div>
                <div className={styles.detailItem}>
                    <span>강수량</span>
                    <span>{rainfall !== null ? `${rainfall} mm` : '--'}</span>
                </div>
                <div className={styles.detailItem}>
                    <span>풍속</span>
                    <span>{windSpeed !== null ? `${windSpeed} m/s` : '--'}</span>
                </div>
                <div className={styles.detailItem}>
                    <span>풍향</span>
                    <span>{windDirection !== null ? `${windDirection}°` : '--'}</span>
                </div>
            </div>
            <div>
                <div>
                    <span>{location?.lat}, {location?.lon}</span>
                </div>
            </div>
        </div>
    );
}
