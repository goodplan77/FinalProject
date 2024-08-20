package com.kh.backend.domain.user.model.service;

import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.kh.backend.domain.user.model.vo.User;

public interface UserService extends UserDetailsService{
	
	// 이메일 중복 확인 메서드
	int checkEmail(String email);
	
	// 닉네임 중복 확인 메서드
	int checkNickName(String nickName);

	// 회원가입 메서드
	int insertUser(User user);

	// 소셜 로그인 메서드
	User loginSocial(HashMap<String, Object> map);

	// 회원 조회 메서드(UserDetails)
	UserDetails loadUserByUsername(String userPk);
	
	// 회원 조회 메서드
	User selectUser(HashMap<String, Object> map);


}
