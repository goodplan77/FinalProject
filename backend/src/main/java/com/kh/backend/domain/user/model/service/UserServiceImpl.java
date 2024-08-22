package com.kh.backend.domain.user.model.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.backend.domain.user.model.dao.UserDao;
import com.kh.backend.domain.user.model.dto.KakaoUserInfoResponse;
import com.kh.backend.domain.user.model.vo.Dog;
import com.kh.backend.domain.user.model.vo.ImgDog;
import com.kh.backend.domain.user.model.vo.ImgUser;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final KakaoApi kakaoApi; 
	private final UserDao dao;
	
	// 이메일 중복 확인 메서드
	@Override
	public int checkEmail(String email) {
		return dao.checkEmail(email);
	}
	
	// 닉네임 중복 확인 메서드
	@Override
	public int checkNickName(String nickName) {
		return dao.checkNickName(nickName);
	}

	// 회원가입 메서드
	@Override
	public int insertUser(User user) {
		return dao.insertUser(user);
	}

	// 소셜 로그인 메서드
	@Override
	public User loginSocial(HashMap<String, Object> map) {
		
		String socialType = (String) map.get("socialType");
		
		KakaoUserInfoResponse kakaoInfo = new KakaoUserInfoResponse();
		String socialId = "";
		
		switch(socialType) {
		case "kakao" : 
			kakaoInfo = kakaoApi.getUserInfo(map);
			socialId = socialType + kakaoInfo.getId();
			break;
		case "google" : break;
		default : break;
		}
		
		map.put("socialId", socialId);
		
		User user = (User) dao.loadUserByUsername(map);
		
		int result = 1;
		
		// 가입된 정보가 없다면 자동 가입
		if(user == null) {
			
			String currentTime = new SimpleDateFormat("yyyyMMdd").format(new Date());
			int random = (int) (Math.random() * 9000 + 1000);
			String nickName = "";
			String profile = "";
			String email = "";
			
			switch(socialType) {
			case "kakao" : 
				nickName = kakaoInfo.getProperties().getNickname();
				profile = kakaoInfo.getProperties().getThumbnail_image();
				email = kakaoInfo.getKakao_account().getEmail();
				break;
			}
			
			String tempNickName = currentTime + nickName + random;
			String socialPwd = socialType + random;
			
			ImgUser iu = new ImgUser();
			iu.setChangeName(profile);
			
			User u = user.builder()
						 .nickName(tempNickName)
						 .email(email)
						 .socialId(socialId)
						 .pwd(socialPwd)
						 .userName(tempNickName)
						 .points(500)
						 .socialType(socialType) 
						 .imgUser(iu)
						 .build();
			
			
			result *= dao.insertUser(u);
			result *= dao.insertUserSocial(u);
			
			if(result>0) {
				user = (User) dao.loadUserByUsername(map);
			}
			
		}
		
		return user;
	}
	
	// 회원 조회 메서드
	@Override
	public User selectUser(HashMap<String, Object> map) {
		return dao.selectUser(map);
	}

	// 회원 조회 메서드(UserDetails)
	@Override
	public UserDetails loadUserByUsername(String userPk) throws UsernameNotFoundException {
		
		HashMap<String, Object> param = new HashMap<>();
		
		param.put("userNo", Integer.parseInt(userPk));
		
		return dao.loadUserByUsername(param);
	}

	// 반려견 등록 메서드
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertDog(Dog dog, ImgDog id) {
		return dao.insertDog(dog, id);
	}

	
}

