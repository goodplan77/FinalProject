package com.kh.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Board {

	private int boardNo;
	private int userNo;
	private String title;
	private String content;
	private char boardCode; // C 일반, S 중고, A 입양, M 실종, I 정보, E 이벤트,  N 공지
	private String enrollDate; // 일단 String
	private String modifyDate; // 일단 String
	private int views;
	private char status; // "Y - 정상 게시 D - 작성자가 삭제 B - 관리자가 블락 / 블라인드"
	private char detailStatus; // "P - 진행중(판매중, 분양중, 찾는중) D - 완료상태	N - 무상태(일반)"
	private int likes;
}
