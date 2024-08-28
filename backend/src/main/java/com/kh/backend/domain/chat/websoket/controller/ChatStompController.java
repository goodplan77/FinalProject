package com.kh.backend.domain.chat.websoket.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.kh.backend.domain.chat.model.service.ChatService;
import com.kh.backend.domain.chat.model.vo.Message;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatStompController {
	
	private final ChatService service;
	
	@SendTo("/chat/chatRoomNo/{chatRoomNo}/message")
	@MessageMapping("/sendMessage/chatRoomNo/{chatRoomNo}")
	public Message insertChatMEssage(
			@DestinationVariable int chatRoomNo,
			Message message
			) {
		log.info("chatRoomNo ?? {}", chatRoomNo);
		log.info("message ?? {}", message);
		
		// 로직 - 1) db에 채팅메세지 등록
		// 로직 - 2) 같은 방 사용자에게 채팅 내용 전달
		return service.insertChatMessage(message);
		
		
		
//		return message;
	}
	
	@MessageMapping("/chatRoomJoin/{chatRoomNo}/{userNo}newMember")
	@SendTo("/chat/chatRoomNo/{chatRoomNo}/newUser")
	public User newUser(
			@DestinationVariable int chatRoomNo,
			@DestinationVariable int userNo,
			User u
			) {
		log.info("userNo : {}", userNo);
		// 참여한 회원 정보를 조회해서 반환을 할 것
		u = service.selectUser(userNo);
		
		return u;
	}
	
	
	
	
	
}
