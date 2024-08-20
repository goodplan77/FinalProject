package com.kh.backend.domain.user.model.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class KakaoUserInfoResponse {
	
	private String id;
	private Boolean has_signed_up;
	
	private KakaoAccount kakao_account;
	private Properties properties;
	
	@Getter
	public static class KakaoAccount {
		private Boolean profile_needs_agreement;
		private Boolean profile_nickname_needs_agreement;
		private Boolean profile_image_needs_agreement;
		private Boolean email_needs_agreement;
		private String email;
	}
	
	@Getter
	public static class Properties{
		private String nickname;
		private String profile_image;
		private String thumbnail_image;		
	}

}
