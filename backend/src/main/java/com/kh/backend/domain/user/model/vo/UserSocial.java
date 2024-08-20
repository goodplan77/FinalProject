package com.kh.backend.domain.user.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSocial {

	private String socialId;
	private int userNo;
	private String socialType;
}
