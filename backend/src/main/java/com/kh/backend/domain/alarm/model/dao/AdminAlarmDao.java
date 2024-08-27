package com.kh.backend.domain.alarm.model.dao;

import java.util.List;

import com.kh.backend.domain.alarm.model.vo.AdminAlarm;

public interface AdminAlarmDao {

	int save(AdminAlarm alarm);

	int updateReadStatus(AdminAlarm alarm);

	List<AdminAlarm> unReadList();

}
