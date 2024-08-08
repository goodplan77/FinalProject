package com.kh.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ask {

	private int askNo;
	private int userNo;
	private String content;
	private String resContent;
	private char status; // Y - 답변완료 N - 미완료
	private String askDate; // 일단 String
	private String resDate; // 일단 String
	private String title;
	
}
