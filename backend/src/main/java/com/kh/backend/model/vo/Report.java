package com.kh.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {

	private int reportNo;
	private int userNo;
	private String category;
	private String content;
	private String reportDate; // 일단 String
	private char reportType; // C - 댓글(COMMENT) R - 대댓글(REPLY) B - 게시글(BOARD)
	private int boardNo;
	private int chatRoomNo;
	private int commentNo;
	private int replyNo;
}
