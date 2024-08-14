package com.kh.backend.domain.board.model.vo;

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
