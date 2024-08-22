package com.kh.backend.domain.user.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AdminUserDaoImpl implements AdminUserDao{
	
	private final SqlSessionTemplate session;

	@Override
	public List<User> selectUsers() {
		return session.selectList("adminUser.selectUsers");
	}

	@Override
	public User selectUserOne(int userNo) {
		return session.selectOne("adminUser.selectUserOne" , userNo);
	}

}
