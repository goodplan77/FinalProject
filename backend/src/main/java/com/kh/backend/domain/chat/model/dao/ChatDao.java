package com.kh.backend.domain.chat.model.dao;

import java.util.List;

import com.kh.backend.domain.chat.model.vo.ChatRoom;
import com.kh.backend.domain.chat.model.vo.Message;
import com.kh.backend.domain.user.model.vo.User;

public interface ChatDao {

	List<ChatRoom> chatList();

	int openChatRoom(User toUser);

	List<Message> messageSelect(int chatRoomNo);

}
