package com.kh.backend.model.vo;

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
