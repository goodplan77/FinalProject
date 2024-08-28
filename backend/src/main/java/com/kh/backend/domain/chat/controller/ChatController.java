package com.kh.backend.domain.chat.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	@GetMapping("/chatRoomList")
	public ResponseEntity<List<ChatRoom>> chatRoomList(
	        @RequestParam Long fromUserNo, 
	        @RequestParam Long toUserNo) {
	    List<ChatRoom> chatRooms = chatService.chatList(fromUserNo, toUserNo);
	    return ResponseEntity.ok(chatRooms);
	}
	
	// 다른 사용자와 연결되는 1대1 채팅방 만들기
	@PostMapping("/makeChatRoom")
	public ChatRoom makeChatRoom(
			@RequestBody ChatRoom users
			) {
		log.debug("users == {}", users);
		
		int result = chatService.makeChatRoom(users);
		
		return null;
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
	
	
	// 채팅방에 있는 유저 확인하기
	@GetMapping("/chatRoomJoin/chatRoomNo/{chatRoomNo}")
	public List<User> selectChatRoomUser(
			@PathVariable int chatRoomNo
			){
		return chatService.selectChatRoomUser(chatRoomNo);
	}

	// 이미 있는 채팅방이 있는지 체크
	@GetMapping("/checkChatRoom")
	public int checkChatRoom(
	        @RequestParam("toUserNo") int toUserNo,
	        @RequestParam("fromUserNo") int fromUserNo
	) {
		
	    log.debug("도달 성공");
	    log.debug("toUserNo == {}", toUserNo);
	    log.debug("fromUserNo == {}", fromUserNo);
	    
	    ChatRoom users = new ChatRoom();
	    users.setToUserNo(toUserNo);
	    users.setFromUserNo(fromUserNo);

	    List<ChatRoom> list = chatService.checkChatRoom(users);
	    
	    log.debug("list == {}", list);
	    
	    return list.size();
	}
	
	@PostMapping("/closeChat")
	public ResponseEntity<String> closeChatRoom(@RequestBody ChatRoom chatRoomData) {
	    log.debug("fromUserNo : {}", chatRoomData.getFromUserNo());
	    log.debug("chatRoomNo : {}", chatRoomData.getChatRoomNo());

	    int result = chatService.closeChatRoom(chatRoomData);

	    
	    return ResponseEntity.ok("Chat room closed successfully");
	    
	}
}
