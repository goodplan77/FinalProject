<<<<<<<< HEAD:backend/src/main/java/com/kh/backend/domain/ask/model/vo/Ask.java
package com.kh.backend.domain.ask.model.vo;

import com.kh.backend.domain.user.model.vo.User;
========
package com.kh.backend.domain.user.model.vo;
>>>>>>>> jayhp:backend/src/main/java/com/kh/backend/domain/user/model/vo/Ask.java

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ask {

	private int askNo;
	private int userNo;
	private String content;
	private String resContent;
	private char status; // Y - 답변완료 N - 미완료
	private String askDate; // 일단 String
	private String resDate; // 일단 String
	private String title;
	
	private User user;
	
}
