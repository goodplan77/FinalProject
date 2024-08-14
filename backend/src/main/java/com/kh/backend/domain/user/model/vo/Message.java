<<<<<<<< HEAD:backend/src/main/java/com/kh/backend/domain/chat/model/vo/Message.java
package com.kh.backend.domain.chat.model.vo;
========
package com.kh.backend.domain.user.model.vo;
>>>>>>>> jayhp:backend/src/main/java/com/kh/backend/domain/user/model/vo/Message.java

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
