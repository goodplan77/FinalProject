package com.kh.backend.domain.alarm.model.dao;

import java.util.List;

import com.kh.backend.domain.alarm.model.vo.Alarm;

public interface AlarmDao {

	int save(Alarm alarm);

	int updateReadStatus(Alarm alarm);

	List<Alarm> unReadList(int userNo);

}
