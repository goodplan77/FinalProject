package com.kh.backend.domain.alarm.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.alarm.model.vo.AdminAlarm;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AdminAlarmDaoImpl  implements AdminAlarmDao{
	
	private final SqlSessionTemplate session;
	
	@Override
	public int save(AdminAlarm alarm) {
		return session.insert("alarm.insertAdminAlarm", alarm);
	}

	@Override
	public int updateReadStatus(AdminAlarm alarm) {
		return session.update("alarm.updateAdminReadStatus", alarm);
	}

	@Override
	public List<AdminAlarm> unReadList() {
		return session.selectList("alarm.unReadAdminList");
	}

}
