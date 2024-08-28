package com.kh.backend.domain.chat.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.chat.model.vo.ChatRoom;
import com.kh.backend.domain.chat.model.vo.Message;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ChatDaoImpl implements ChatDao{
	
	private final SqlSessionTemplate session;

	@Override
    public List<ChatRoom> chatList(Long fromUserNo, Long toUserNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("fromUserNo", fromUserNo);
        params.put("toUserNo", toUserNo);
        
        return session.selectList("chat.chatList", params);
    }

	@Override
	public List<Message> messageSelect(int chatRoomNo) {
		return session.selectList("chat.messageSelect", chatRoomNo);
	}

	@Override
	public int makeChatRoom(ChatRoom users) {
		return session.insert("chat.makeChatRoom", users);
	}

	@Override
	public void insertChatMessage(Message message) {
		session.insert("chat.insertChatMessage", message);
	}

	@Override
	public User selectUser(int userNo) {
		return session.selectOne("chat.selectUser", userNo);
	}

	@Override
	public Message selectChatMessage(int messageNo) {
		return session.selectOne("chat.selectChatMessage", messageNo);
	}

	@Override
	public List<User> selectChatRoomUser(int chatRoomNo) {
		return session.selectList("chat.selectChatRoomUser", chatRoomNo);
	}

	@Override
	public List<ChatRoom> checkChatRoom(ChatRoom users) {
		return session.selectList("chat.checkChatRoom", users);
	}

	@Override
	public int closeChatRoom(ChatRoom chatRoomData) {
		return session.update("chat.closeChatRoom", chatRoomData);
	}

}
