package com.kh.backend.domain.chat.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.chat.model.dao.ChatDao;
import com.kh.backend.domain.chat.model.vo.ChatRoom;
import com.kh.backend.domain.chat.model.vo.Message;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{
	
	private final ChatDao chatDao;

	@Override
    public List<ChatRoom> chatList(Long fromUserNo, Long toUserNo) {
        return chatDao.chatList(fromUserNo, toUserNo);
    }
	
	@Override
	public List<Message> messageSelect(int chatRoomNo) {
		return chatDao.messageSelect(chatRoomNo);
	}

	@Override
	public int makeChatRoom(ChatRoom users) {
		return chatDao.makeChatRoom(users);
	}

	@Override
	public Message insertChatMessage(Message message) {
		chatDao.insertChatMessage(message);
		return chatDao.selectChatMessage(message.getMessageNo());
	}

	@Override
	public User selectUser(int userNo) {
		return chatDao.selectUser(userNo);
	}

	
	
}
