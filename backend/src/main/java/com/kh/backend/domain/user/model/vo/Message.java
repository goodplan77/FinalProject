package com.kh.backend.domain.user.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {

	private int messageNo;
	private int chatRoomNo;
	private int userNo;
	private String content;
	private String messageDate; // 일단 String
}
