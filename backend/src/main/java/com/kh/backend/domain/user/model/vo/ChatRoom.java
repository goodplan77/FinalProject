<<<<<<<< HEAD:backend/src/main/java/com/kh/backend/domain/chat/model/vo/ChatRoom.java
package com.kh.backend.domain.chat.model.vo;
========
package com.kh.backend.domain.user.model.vo;
>>>>>>>> jayhp:backend/src/main/java/com/kh/backend/domain/user/model/vo/ChatRoom.java

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

	private int chatRoomNo;
	private int fromUserNo;
	private char fromStatus; // Y - 있음 N - 나감
	private int toUserNo;
	private char toStatus; // Y - 있음 N - 나감
}
