package com.kh.backend.domain.user.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Memo {

	private int memoNo;
	private int userNo;
	private String content;
	private String targetDate; // 일단 String
}
