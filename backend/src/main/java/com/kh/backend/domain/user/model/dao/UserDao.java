package com.kh.backend.domain.user.model.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import com.kh.backend.domain.user.model.vo.Dog;
import com.kh.backend.domain.user.model.vo.History;
import com.kh.backend.domain.user.model.vo.ImgDog;
import com.kh.backend.domain.user.model.vo.ImgUser;
import com.kh.backend.domain.user.model.vo.Like;
import com.kh.backend.domain.user.model.vo.User;

public interface UserDao {

	// 이메일 중복확인 메서드
	int checkEmail(String email);
	
	// 닉네임 중복 확인 메서드
	int checkNickName(String nickName);

	// 회원 가입 메서드
	int insertUser(User user);

	// 소셜 회원 가입 메서드
	int insertUserSocial(User u);
	
	// 회원 조회 메서드
	User selectUser(HashMap<String, Object> map);
	
	ImgUser selectImgUser(int userNo);

	ImgDog selectImgDog(int dogNo);

	// 회원 조회 메서드(UserDetails)
	UserDetails loadUserByUsername(HashMap<String, Object> param);

	// 회원 정보 수정 메서드
	int updateUser(User user);
	
	// 회원 정보 수정 메서드(프사)
	int updateImgUser(ImgUser iu);
	
	// 반려견 등록 메서드
	int insertDog(Dog dog, ImgDog id);

	// 회원 프사 등록 메서드
	int insertImgUser(ImgUser iu);

	int hasUserLike(Like userLike);

	int insertBoardLike(Like like);

	int insertPointHistory(History history);

	int updateUserPoint(int userNo, int point);

	int updateLoginDate(User user);

	// 회원의 반려견 목록 조회
	List<Dog> selectDogs(int userNo);

	String findUserId(User user);

	int findUserPwd(User user);

	int changePassword(User user);
	
	
//	미사용 -> 추후 삭제 가능
//	int insertAuthority(User u);
//	
//	UserSocial selectSocialType(String socialId);
}
