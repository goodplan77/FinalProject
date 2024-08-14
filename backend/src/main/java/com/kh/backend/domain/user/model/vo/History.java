package com.kh.backend.domain.user.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class History {

	private int historyNo;
	private int userNo;
	private int point; // 회원가입 - 500점 | 로그인 - 100점 (24시 기준) | 게시글 작성 - 100점 | 댓글 작성 - 50점 | 이벤트 - 50 ~ 500점
	private String pointDate; // 일단 String
	private String content;
}
