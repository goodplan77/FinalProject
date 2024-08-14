package com.kh.backend.domain.user.model.dao;

import com.kh.backend.domain.user.model.vo.User;

public interface UserDao {

	int checkNickName(String nickName);

	int insertUser(User user);

}
