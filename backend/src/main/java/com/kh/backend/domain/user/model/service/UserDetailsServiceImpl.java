package com.kh.backend.domain.user.model.service;

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
	public UserDetails loadUserByUsername(String socialId) throws UsernameNotFoundException {
		
		UserSocial user = dao.selectSocialType(socialId);
		String socialType = user.getSocialType();
		
		return dao.loadUserByUsername(socialId, socialType);
	}

}
