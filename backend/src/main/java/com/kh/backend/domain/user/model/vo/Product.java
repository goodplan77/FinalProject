package com.kh.backend.domain.user.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

	private int productNo;
	private int price;
	private int qty;
	private String content;
	private char status; // Y - 교환 가능 N - 불가능
	private int likes;
	private String img; // 상품 이미지만 따로 관리하는 컬럼
}
