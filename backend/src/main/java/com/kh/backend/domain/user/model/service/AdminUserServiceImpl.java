package com.kh.backend.domain.user.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.user.model.dao.AdminUserDao;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService{
	
	private final AdminUserDao userDao;

	@Override
	public List<User> selectUsers() {
		return userDao.selectUsers();
	}

}
