<<<<<<<< HEAD:backend/src/main/java/com/kh/backend/domain/report/model/vo/Report.java
package com.kh.backend.domain.report.model.vo;
========
package com.kh.backend.domain.user.model.vo;
>>>>>>>> jayhp:backend/src/main/java/com/kh/backend/domain/user/model/vo/Report.java

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {

	private int reportNo;
	private int userNo;
	private String category;
	private String content;
	private String reportDate; // 일단 String
	private char typeCode; // B, C, L, M, R, P
	private int refNo;
}
