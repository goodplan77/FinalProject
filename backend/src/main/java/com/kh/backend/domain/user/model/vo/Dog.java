package com.kh.backend.domain.user.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dog {

	private int dogNo;
	private int userNo;
	private char isMain; // DB에서는 char
	private String dogName;
	private String breed; // "견종 직접 작성 가능	(디폴트 모름)"
	private char gender; // "성별 선택 M - 수컷 F - 암컷 N - 모름"
	private String birthday; // 일단 String
	private String note;
}
