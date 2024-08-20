package com.kh.backend.domain.user.model.dao;

import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;

import com.kh.backend.domain.user.model.vo.User;
import com.kh.backend.domain.user.model.vo.UserSocial;

public interface UserDao {

	// 이메일 중복확인 메서드
	int checkEmail(String email);
	
	// 닉네임 중복 확인 메서드
	int checkNickName(String nickName);

	// 회원 가입 메서드
	int insertUser(User user);

	// 소셜 회원 가입 메서드
	int insertUserSocial(User u);
	
	// 회원 조회 메서드
	User selectUser(HashMap<String, Object> map);

	// 회원 조회 메서드(UserDetails)
	UserDetails loadUserByUsername(HashMap<String, Object> param);

//	미사용 -> 추후 삭제 가능
//	int insertAuthority(User u);
//	
//	UserSocial selectSocialType(String socialId);
}
