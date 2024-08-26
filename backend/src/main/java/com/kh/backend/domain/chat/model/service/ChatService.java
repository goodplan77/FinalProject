package com.kh.backend.domain.chat.model.service;

import java.util.List;

import com.kh.backend.domain.chat.model.vo.ChatRoom;
import com.kh.backend.domain.chat.model.vo.Message;
import com.kh.backend.domain.user.model.vo.User;

public interface ChatService {

	List<ChatRoom> chatList(Long fromUserNo, Long toUserNo);

	List<Message> messageSelect(int chatRoomNo);

	int makeChatRoom(ChatRoom users);

	Message insertChatMessage(Message message);

	User selectUser(int userNo);

}
