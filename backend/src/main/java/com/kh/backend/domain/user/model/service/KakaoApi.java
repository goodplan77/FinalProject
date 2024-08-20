package com.kh.backend.domain.user.model.service;

import java.util.HashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.domain.user.model.dto.KakaoUserInfoResponse;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class KakaoApi {

	private final WebClient webClient;
	
	private static final String KAKAO_USER_INFO_URI = "https://kapi.kakao.com/v2/user/me";
	
	public KakaoUserInfoResponse getUserInfo(HashMap<String, Object> map) {
		
		String accessToken = (String) map.get("accessToken");
		
		return webClient.get()
			     .uri(KAKAO_USER_INFO_URI)
			     .header("Authorization", "Bearer "+accessToken) // 요청 헤더
			     .retrieve()
			     .bodyToFlux(KakaoUserInfoResponse.class) // 응답받은 데이터를 매개변수의 클래스 형태로 받겠다
			     .blockFirst();
	}
	
	
	
}
