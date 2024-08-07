package com.kh.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reply {

	private int replyNo;
	private int commentNo;
	private int userNo;
	private String content;
	private String replyDate; // 일단 String
	private String modifyDate; // 일단 String
	private char status; // Y - 정상 게시 D - 작성자가 삭제 B - 관리자가 블락 / 블라인드
}
