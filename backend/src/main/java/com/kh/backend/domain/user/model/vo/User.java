package com.kh.backend.domain.user.model.vo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	private int userNo;
	private char grade; // M - 마스터 | A - 관리자 | N - 일반회원
	private String email;
	private String pwd;
	private String userName;
	private String nickName;
	private String phone;
	private String address;
	private char status; // Y - 활동 | N - 탈퇴 | B - 블랙리스트 | V - 휴면
	private int points;
	private String enrollDate; // 일단 String
	private String modifyDate; // 일단 String
	private String userSsn; // DB에는 char(14byte)
	
	private ImgUser imgUser;
	
	private List<Dog> dogs;
	private List<History> historyList;
	private List<Like> likeList;
	private List<Memo> memoList;
}
