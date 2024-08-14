package com.kh.backend.domain.commit.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

	private int commentNo;
	private int boardNo;
	private int userNo;
	private String content; // 일단 String
	private String commentDate; // 일단 String
	private String modifyDate; // 일단 String
	private char status; // Y - 정상 게시 D - 작성자가 삭제 B - 관리자가 블락 / 블라인드
	private int refNo; // 대댓글이 달린 댓글 번호
}
