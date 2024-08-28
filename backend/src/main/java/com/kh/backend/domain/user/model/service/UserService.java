package com.kh.backend.domain.user.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.kh.backend.domain.user.model.vo.Dog;
import com.kh.backend.domain.user.model.vo.ImgDog;
import com.kh.backend.domain.user.model.vo.ImgUser;
import com.kh.backend.domain.user.model.vo.Like;
import com.kh.backend.domain.user.model.vo.User;

public interface UserService extends UserDetailsService{
	
	// 이메일 중복 확인 메서드
	int checkEmail(String email);
	
	// 닉네임 중복 확인 메서드
	int checkNickName(String nickName);

	// 회원가입 메서드
	int insertUser(User user);

	// 소셜 로그인 메서드
	User loginSocial(HashMap<String, Object> map);

	// 회원 조회 메서드(UserDetails)
	UserDetails loadUserByUsername(String userPk);
	
	// 회원 조회 메서드
	User selectUser(HashMap<String, Object> map);
	
	ImgUser selectImgUser(int userNo);
	
	ImgDog selectImgDog(int userNo);

	// 반려견 등록 메서드
	int insertDog(Dog dog, ImgDog id);

	// 회원 정보 수정 메서드
	int updateUser(User user);

	// 회원 정보 수정 메서드(프사)
	int updateImgUser(ImgUser iu);

	// 회원 프사 등록 메서드
	int insertImgUser(ImgUser iu);

	int hasUserLike(Like userLike);

	int insertBoardLike(Like like);

	int insertPointHistory(int userNo, int point, char pointType);

	int updateLoginDate(User user);

	// 회원의 반려견 목록 조회
	List<Dog> selectDogs(int userNo);

}
