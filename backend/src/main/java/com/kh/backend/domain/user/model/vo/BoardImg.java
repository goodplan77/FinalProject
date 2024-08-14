<<<<<<<< HEAD:backend/src/main/java/com/kh/backend/domain/board/model/vo/BoardImg.java
package com.kh.backend.domain.board.model.vo;
========
package com.kh.backend.domain.user.model.vo;
>>>>>>>> jayhp:backend/src/main/java/com/kh/backend/domain/user/model/vo/BoardImg.java

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardImg {

	private int imgNo;
	private int boardNo;
	private String originName;
	private String changeName;
}
