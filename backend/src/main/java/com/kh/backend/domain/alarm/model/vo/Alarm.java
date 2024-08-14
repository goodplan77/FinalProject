package com.kh.backend.domain.alarm.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alarm {
	
	private int alarmNo;
	private int userNo;
	private int fromUserNo;
	private String content;
	private char status; // "N - 안읽음 Y - 읽음"
	private String alarmDate; // 일단 String
	private char typeCode; // B, C, L, M, R, P
	private int refNo;
	
	private Type type;

}
