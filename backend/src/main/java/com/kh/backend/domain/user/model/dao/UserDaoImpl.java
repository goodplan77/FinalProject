package com.kh.backend.domain.user.model.dao;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.domain.user.model.vo.User;
import com.kh.backend.domain.user.model.vo.UserSocial;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao{

	private final SqlSessionTemplate session;

	// 이메일 중복확인 메서드
	@Override
	public int checkEmail(String email) {
		return session.selectOne("user.checkEmail", email);
	}
	
	// 닉네임 중복 확인 메서드
	@Override
	public int checkNickName(String nickName) {
		return session.selectOne("user.checkNickName", nickName);
	}

	// 회원가입 메서드
	@Override
	public int insertUser(User user) {
		int result = 1;
		
		result *= session.insert("user.insertUser", user);
		result *= session.insert("user.signupPoint", user);
		result *= session.insert("user.insertAuthority", user);
		
		return result;
	}
	
	// 회원 조회 메서드(UserDetails)
	@Override
	public UserDetails loadUserByUsername(HashMap<String, Object> param) {
		return session.selectOne("user.loadUserByUsername", param);
	}

	// 소셜 회원 가입 메서드
	@Override
	public int insertUserSocial(User u) {
		return session.insert("user.insertUserSocial", u);
	}

	// 회원 조회 메서드
	@Override
	public User selectUser(HashMap<String, Object> map) {
		return session.selectOne("user.selectUser", map);
	}

//	미사용 -> 추후 삭제 가능
//	@Override
//	public int insertAuthority(User u) {
//		return session.insert("user.insertAuthority", u);
//	}
//	
//	@Override
//	public UserSocial selectSocialType(String socialId) {
//		return session.selectOne("user.selectSocialType", socialId);
//	}
	
	
}
