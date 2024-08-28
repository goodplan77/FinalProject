package com.kh.backend.domain.chat.model.vo;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.user.model.vo.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

	private int chatRoomNo;
	private int fromUserNo;
	private char fromStatus; // Y - 있음 N - 나감
	private int toUserNo;
	private char toStatus; // Y - 있음 N - 나감
	
	private User toUser;
	private User fromUser;
	
}
