package com.kh.backend.domain.user.model.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.domain.user.model.dao.UserDao;
import com.kh.backend.domain.user.model.dto.KakaoUserInfoResponse;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final KakaoApi kakaoApi; 
	private final UserDao dao;
	
	@Override
	public int checkNickName(String nickName) {
		return dao.checkNickName(nickName);
	}

	@Override
	public int insertUser(User user) {
		return dao.insertUser(user);
	}

	@Override
	public User loginSocial(HashMap<String, Object> map) {
		
		// accessToken, socialType
		String socialType = (String) map.get("socialType");
		
		KakaoUserInfoResponse kakaoInfo = new KakaoUserInfoResponse();
		String socialId = "";
		
		switch(socialType) {
		case "kakao" : 
			kakaoInfo = kakaoApi.getUserInfo(map);
			socialId = kakaoInfo.getId();
			break;
		case "google" : break;
		default : break;
		}
		
		map.put("socialId", socialId);
		
		User user = dao.loadUserByUsername(socialId, socialType);
		
		int result = 1;
		
		if(user == null) {
			
			String currentTime = new SimpleDateFormat("yyyyMMdd").format(new Date());
			int random = (int) (Math.random() * 10000 + 1);
			String nickName = "";
			String profile = "";
			String email = "";
			
			switch(socialType) {
			case "kakao" : 
				nickName = kakaoInfo.getProperties().getNickname();
				profile = kakaoInfo.getProperties().getThumbnail_image();
				email = kakaoInfo.getKakao_account().getEmail();
				
				System.err.println("=========================================");
				System.err.println("email = " + email);
				break;
			}
			
			String tempNickName = currentTime + nickName + random;
			String socialPwd = socialType + random;
			
			User u = user.builder()
						 .nickName(tempNickName)
						 .email(email)
						 .socialId(String.valueOf(socialId))
						 .pwd(socialPwd)
						 .userName(tempNickName)
						 .socialType(socialType) 
						 .build();
			
			result *= dao.insertUser(u);
			result *= dao.insertUserSocial(u);
//			result *= dao.insertAuthority(u);
			
			if(result>0) {
				user = dao.loadUserByUsername(socialId, socialType);
			}
			
		}
		
		return user;
	}
	
	@Override
	public User selectUser(HashMap<String, Object> map) {
		return dao.selectUser(map);
	}

	@Override
	public int checkEmail(String email) {
		return dao.checkEmail(email);
	}


	

}
