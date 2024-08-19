package com.kh.backend.domain.user.model.service;

import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kh.backend.domain.user.model.dao.UserDao;
import com.kh.backend.domain.user.model.vo.UserSocial;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService{

	private final UserDao dao;
	
	@Override
	public UserDetails loadUserByUsername(String userPk) throws UsernameNotFoundException {
		
		HashMap<String, Object> param = new HashMap<>();
		
		param.put("userNo", userPk);
		
		return dao.selectUser(param);
		
		
//		UserSocial user = dao.selectSocialType(userPk);
//		String socialType = user.getSocialType();
//		
//		return dao.loadUserByUsername(userPk, socialType);
	}

}
