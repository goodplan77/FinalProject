package com.kh.backend.domain.chat.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.chat.model.vo.ChatRoom;
import com.kh.backend.domain.chat.model.vo.Message;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatDaoImpl implements ChatDao{
	
	private final SqlSessionTemplate session;

	@Override
	public List<ChatRoom> chatList() {
		return session.selectList("chat.chatList");
	}

	@Override
	public int openChatRoom(User toUser) {
		return session.insert("chat.openChatRoom", toUser);
	}

	@Override
	public List<Message> messageSelect(int chatRoomNo) {
		return session.selectList("chat.messageSelect", chatRoomNo);
	}

}
