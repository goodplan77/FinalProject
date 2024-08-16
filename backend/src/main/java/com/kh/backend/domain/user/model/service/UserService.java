package com.kh.backend.domain.user.model.service;

import java.util.HashMap;

import com.kh.backend.domain.user.model.vo.User;

public interface UserService {

	int checkNickName(String nickName);

	int insertUser(User user);

	User loginSocial(HashMap<String, Object> map);

	User selectUser(HashMap<String, Object> map);

}
