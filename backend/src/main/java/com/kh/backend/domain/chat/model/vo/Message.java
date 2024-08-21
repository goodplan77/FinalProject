package com.kh.backend.domain.chat.model.vo;

import com.kh.backend.domain.user.model.vo.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {

	private int messageNo; // 메세지 번호
	private int chatRoomNo; // 채팅방 번호
	private int userNo; // 상대방 유저No
	private String content; // 해당 번호의 해당하는 메세지 내용
	private String messageDate; // 일단 String
	
	private User user;
}
