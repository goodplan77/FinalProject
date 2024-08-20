package com.kh.backend.domain.user.model.vo;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails{

	private int userNo;
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
	
	private String socialId;
	private String socialType;
	
	private ImgUser imgUser;
	
	private List<Dog> dogs;
	private List<History> historyList;
	private List<Like> likeList;
	private List<Memo> memoList;
	
	private List<SimpleGrantedAuthority> authorities;
	
	public Collection<? extends GrantedAuthority> getAuthorities(){
		return authorities;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return this.userName;
	}

	

}
