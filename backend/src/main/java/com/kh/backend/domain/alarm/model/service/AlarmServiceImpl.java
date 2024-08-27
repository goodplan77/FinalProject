package com.kh.backend.domain.alarm.model.service;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.domain.alarm.model.dao.AlarmDao;
import com.kh.backend.domain.alarm.model.vo.AdminAlarm;
import com.kh.backend.domain.alarm.model.vo.Alarm;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService{
	
	private final AlarmDao alarmDao;
	private final AlarmSenderService alarmSenderService;
	
	@Override
	public int createAndSendAlarm(int userNo, int likeUser, char type, int refNo) {
		Alarm alarm = new Alarm();
		alarm.setUserNo(userNo);
		alarm.setFromUserNo(likeUser);
		alarm.setTypeCode(type);
		alarm.setRefNo(refNo);
		int result = alarmDao.save(alarm);

		// 2. 실시간 알림 전송
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			String jsonMessage = objectMapper.writeValueAsString(alarm); // 객체를 JSON으로 변환
			log.debug("알림 보내기 확인 : {}", jsonMessage);
			alarmSenderService.sendAlarm(jsonMessage , false);
		} catch (Exception e) {
			log.error("JSON 변환 중 오류 발생", e);
		}
		
		return result;
	}

	@Override
	public int updateReadStatus(int userNo , String alarmType, int refNo) {
		Alarm alarm = new Alarm();
		alarm.setUserNo(userNo);
		alarm.setTypeCode(alarmType.charAt(0));
		alarm.setRefNo(refNo);
		return alarmDao.updateReadStatus(alarm);
	}

	@Override
	public List<Alarm> unReadList(int userNo) {
		return alarmDao.unReadList(userNo);
	}

}
