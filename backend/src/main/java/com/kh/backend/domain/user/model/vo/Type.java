<<<<<<<< HEAD:backend/src/main/java/com/kh/backend/domain/alarm/model/vo/Type.java
package com.kh.backend.domain.alarm.model.vo;
========
package com.kh.backend.domain.user.model.vo;
>>>>>>>> jayhp:backend/src/main/java/com/kh/backend/domain/user/model/vo/Type.java

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Type {

	private char typeCode; // B, C, L, M, R, P
	private String typeName; // 게시글, 댓글, 좋아요, 채팅방, 문의 답변, 상품
}
