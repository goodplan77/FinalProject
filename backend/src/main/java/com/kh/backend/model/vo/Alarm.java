package com.kh.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alarm {
	
	private int alarmNo;
	private int userNo;
	private int fromUserNo;
	private String content;
	private char status;
	private String alarmDate; // 일단 String
	private char alarmType; // "C - 댓글 (BOARD) L - 좋아요 (BOARD) R - 대댓글 (COMMENT)	M - 채팅메세지 (CHAT_ROOM)"
	private int chatRoomNo;
	private int boardNo;
	private int commentNo;

}
