package com.kh.backend.domain.user.model.dao;

import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;

import com.kh.backend.domain.user.model.vo.User;
import com.kh.backend.domain.user.model.vo.UserSocial;

public interface UserDao {

	int checkNickName(String nickName);

	int insertUser(User user);

	User loadUserByUsername(String socialId, String socialType);

	int insertUserSocial(User u);

	int insertAuthority(User u);

	User selectUser(HashMap<String, Object> map);

	UserSocial selectSocialType(String socialId);

}
