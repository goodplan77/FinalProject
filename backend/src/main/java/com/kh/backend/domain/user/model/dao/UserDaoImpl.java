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

	@Override
	public int checkNickName(String nickName) {
		return session.selectOne("user.checkNickName", nickName);
	}

	@Override
	public int insertUser(User user) {
		session.insert("user.signupPoint", user);
		return session.insert("user.insertUser", user);
	}

	@Override
	public User loadUserByUsername(String socialId, String socialType) {
		
		HashMap<String, Object> param = new HashMap<>();
		param.put("socialId", socialId);
		param.put("socialType", socialType);
		
		return session.selectOne("user.loadUserByUsername", param);
	}

	@Override
	public int insertUserSocial(User u) {
		return session.insert("user.insertUserSocial", u);
	}

	@Override
	public int insertAuthority(User u) {
		return session.insert("user.insertAuthority", u);
	}

	@Override
	public User selectUser(HashMap<String, Object> map) {
		return session.selectOne("user.selectUser", map);
	}

	@Override
	public UserSocial selectSocialType(String socialId) {
		return session.selectOne("user.selectSocialType", socialId);
	}
	
	
	
	
}
