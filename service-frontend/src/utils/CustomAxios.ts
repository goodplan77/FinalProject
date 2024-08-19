import axios from "axios";
import { getCookie, removeCookie } from "./Cookie";

// axios전송시 header에 항상 access_token을 추가
const CustomAxios = axios.create({
    // headers : {
    //     "Authorization" : getCookie("accessToken")
    // }
})

CustomAxios.interceptors.request.use(function(request){
    //끼어들 코드
    request.headers.Authorization = "Bearer "+getCookie('accessToken')

    return request;
});

CustomAxios.interceptors.response.use(function(response){
    return response;
}, function(error){
    const {config, response:{status}} = error;

    // 403에러 (접근권한이 없을 때)
    // 1) 실제로 권한이 없는 url(rest)을 요청하는 경우
    // 2) 로그인을 하지 않은 경우
    // 3) JWT토큰이 만료된 경우
    // if(status == 403){
    //     // 로그인 정보 지워주기
    //     removeCookie('accessToken');
    //     removeCookie('user');

    //     // 로그인 페이지로 보내기
    //     window.location.href = '/'; // '/로그인경로'
    // }
});

export default CustomAxios;