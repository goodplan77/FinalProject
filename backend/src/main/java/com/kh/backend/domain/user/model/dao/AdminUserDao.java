package com.kh.backend.domain.user.model.dao;

import java.util.List;

import com.kh.backend.domain.user.model.vo.User;

public interface AdminUserDao {

	List<User> selectUsers();

	User selectUserOne(int userNo);

}
