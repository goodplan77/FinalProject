package com.kh.backend.domain.alarm.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.alarm.model.vo.Alarm;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AlarmDaoImpl implements AlarmDao{
	
	private final SqlSessionTemplate session;
	
	@Override
	public int save(Alarm alarm) {
		return session.insert("alarm.insertAlarm", alarm);
	}

	@Override
	public int updateReadStatus(Alarm alarm) {
		return session.update("alarm.updateReadStatus", alarm);
	}

	@Override
	public List<Alarm> unReadList(int userNo) {
		return session.selectList("alarm.unReadList" , userNo);
	}

}
