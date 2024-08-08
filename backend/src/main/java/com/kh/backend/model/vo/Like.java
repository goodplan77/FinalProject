package com.kh.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Like {

	private int likeNo;
	private int userNo;
	private char typeCode; // B, P
	private int refNo; // 게시글, 상품
}
