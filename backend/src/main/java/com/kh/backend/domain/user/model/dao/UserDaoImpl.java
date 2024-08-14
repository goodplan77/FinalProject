package com.kh.backend.domain.user.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.user.model.vo.User;

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
		return session.insert("user.insertUser", user);
	}
	
	
	
	
}
