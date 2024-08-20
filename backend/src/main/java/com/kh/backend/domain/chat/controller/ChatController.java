package com.kh.backend.domain.chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.chat.model.service.ChatService;
import com.kh.backend.domain.chat.model.vo.ChatRoom;
import com.kh.backend.domain.chat.model.vo.Message;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/chat")
@CrossOrigin(origins = {"http://localhost:3013"})
@RequiredArgsConstructor
public class ChatController {
	
	private final ChatService chatService;
	
	// 내 채팅방 리스트 조회하기
	@GetMapping("chatList")
	public List<ChatRoom> chatList(
			// 현재 JWT 토큰에 담긴 로그인 유저정보를 가져와야한다.
			){
		
		// 디코딩 과정을 거쳐서 서비스로 넘겨줘야한다.
		
		return chatService.chatList();
	}
	
	// 다른 사용자와 연결되는 1대1 채팅방 만들기
	@PostMapping("/chatRoom")
	public int openChatRoom(
			@RequestBody User toUser
			// 1. 매개변수로 현재 토큰에 담긴 로그인 유저정보를 가져와야한다.
			) {
		
		// 2. 토큰은 암호화가 되어있다. 디코딩 단계를 거쳐서 사용해야한다.
		
		// 3. 그것을 맵에 담아서 서비스에 넘겨줘야한다.
		
		return chatService.openChatRoom(toUser);
	}
	////////////////////////////////////////채팅방 생성하고, 채팅방 조회 끝//////////////////////////////////////
	
	
	// 채팅방 들어가기
	// 들어갔을때는(채팅방 내부에서는) 다른 이용자의 닉네임, 프사, 내가보낸, 상대가 보낸 메세지들이 표시돼야한다.
	// 매개변수로 받아올것은 해당 채팅방의 번호.
	// 반환형은 Message.
	// 주고받은 메세지를 조회해온다. selectList를 이용한다.
	// **단순 조회하는 메소드**
	@GetMapping("/chatRoom/{chatRoomNo}")
	public List<Message> messageSelect(
			@PathVariable int chatRoomNo
			) {
		
		List<Message> messages = chatService.messageSelect(chatRoomNo);
		
		log.debug("messages == {}", messages);
		
		return messages;
	}
	
	
	
	
	
}
