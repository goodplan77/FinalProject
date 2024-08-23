package com.kh.backend.domain.user.model.dao;

import java.util.HashMap;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.user.model.vo.Dog;
import com.kh.backend.domain.user.model.vo.ImgDog;
import com.kh.backend.domain.user.model.vo.ImgUser;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao{

	private final SqlSessionTemplate session;

	// 이메일 중복확인 메서드
	@Override
	public int checkEmail(String email) {
		return session.selectOne("user.checkEmail", email);
	}
	
	// 닉네임 중복 확인 메서드
	@Override
	public int checkNickName(String nickName) {
		return session.selectOne("user.checkNickName", nickName);
	}

	// 회원가입 메서드
	@Override
	public int insertUser(User user) {
		int result = 1;
		
		result *= session.insert("user.insertUser", user);
		result *= session.insert("user.signupPoint", user);
		result *= session.insert("user.insertAuthority", user);
		
		return result;
	}
	
	// 회원 조회 메서드(UserDetails)
	@Override
	public UserDetails loadUserByUsername(HashMap<String, Object> param) {
		return session.selectOne("user.loadUserByUsername", param);
	}

	// 소셜 회원 가입 메서드
	@Override
	public int insertUserSocial(User u) {
		return session.insert("user.insertUserSocial", u);
	}

	// 회원 조회 메서드
	@Override
	public User selectUser(HashMap<String, Object> map) {
		return session.selectOne("user.selectUser", map);
	}
	
	// 회원 정보 수정 메서드
	@Override
	public int updateUser(User user) {
		return session.update("user.updateUser", user);
	}
	
	// 회원 정보 수정 메서드(프사)
	@Override
	public int updateImgUser(ImgUser iu) {
		return session.update("user.updateImgUser", iu);
	}

	// 반려견 등록 메서드
	@Override
	public int insertDog(Dog dog, ImgDog id) {
		int result = 1;
		result *= session.insert("user.insertDog", dog);
		
		if(id != null) {
			id.setDogNo(dog.getDogNo());
			result *= session.insert("user.insertImgDog", id);
		}
		
		return result;
	}

	// 회원 프사 등록 메서드
	@Override
	public int insertImgUser(ImgUser iu) {
		return session.insert("user.insertImgUser", iu);
	}

	

	
	
	
	

//	미사용 -> 추후 삭제 가능
//	@Override
//	public int insertAuthority(User u) {
//		return session.insert("user.insertAuthority", u);
//	}
//	
//	@Override
//	public UserSocial selectSocialType(String socialId) {
//		return session.selectOne("user.selectSocialType", socialId);
//	}
	
	
}
