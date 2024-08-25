package com.kh.backend.domain.alarm.model.service;

import java.util.List;

import com.kh.backend.domain.alarm.model.vo.AdminAlarm;

public interface AdminAlarmService {

	void createAndSendAlarm(char type, int reportNo);

	int updateReadStatus(String alarmType, int reportRefNo);

	List<AdminAlarm> unReadList();

}
