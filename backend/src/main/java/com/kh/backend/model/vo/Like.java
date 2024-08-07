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
	private char likeType; // B - 게시글 P - 상품
	private int boardNo;
	private int productNo;
}
