package com.kh.backend.domain.alarm.model.service;

import java.util.List;

import com.kh.backend.domain.alarm.model.vo.Alarm;

public interface AlarmService {

	int createAndSendAlarm(int userNo, int likeUser, char type, int refNo);

	int updateReadStatus(int userNo , String alarmType, int refNo);

	List<Alarm> unReadList(int userNo);

}
