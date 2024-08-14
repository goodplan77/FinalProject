<<<<<<<< HEAD:backend/src/main/java/com/kh/backend/domain/board/model/vo/BoardType.java
package com.kh.backend.domain.board.model.vo;
========
package com.kh.backend.domain.user.model.vo;
>>>>>>>> jayhp:backend/src/main/java/com/kh/backend/domain/user/model/vo/BoardType.java

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardType {

	private char boardCode; // C, S, A, M, I, E,  N
	private String boardName; // 일반, 중고, 입양, 실종, 정보, 이벤, 공지
}
