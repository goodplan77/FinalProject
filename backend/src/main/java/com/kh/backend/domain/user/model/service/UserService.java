package com.kh.backend.domain.user.model.service;

import com.kh.backend.domain.user.model.vo.User;

public interface UserService {

	int checkNickName(String nickName);

	int insertUser(User user);

}
