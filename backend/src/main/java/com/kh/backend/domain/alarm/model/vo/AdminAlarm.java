package com.kh.backend.domain.alarm.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAlarm {
	
	private int alarmNo;
	private String alarmDate; // 일단 String
	private String status;
	private char typeCode; // I , R
	private int refNo;
}
