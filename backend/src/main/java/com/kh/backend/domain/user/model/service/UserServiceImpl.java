package com.kh.backend.domain.user.model.service;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.user.model.dao.UserDao;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserDao dao;
	
	@Override
	public int checkNickName(String nickName) {
		return dao.checkNickName(nickName);
	}

	@Override
	public int insertUser(User user) {
		return dao.insertUser(user);
	}

}
