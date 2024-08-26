package com.kh.backend.domain.alarm.model.service;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.domain.alarm.model.dao.AdminAlarmDao;
import com.kh.backend.domain.alarm.model.vo.AdminAlarm;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminAlarmServiceImpl implements AdminAlarmService {

	private final AdminAlarmDao adminAlarmDao;
	private final AlarmSenderService alarmSenderService;

	@Override
	public void createAndSendAlarm(char type, int reportNo) {
		// 1. 알림 데이터 생성 및 저장
		AdminAlarm alarm = new AdminAlarm();
		alarm.setTypeCode(type); // 알림 타입 설정 (R: 신고, I: 문의)
		alarm.setRefNo(reportNo);
		adminAlarmDao.save(alarm);

		// 2. 실시간 알림 전송
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			String jsonMessage = objectMapper.writeValueAsString(alarm); // 객체를 JSON으로 변환
			log.debug("알림 보내기 확인 : {}", jsonMessage);
			alarmSenderService.sendAlarm(jsonMessage);
		} catch (Exception e) {
			log.error("JSON 변환 중 오류 발생", e);
		}
	}

	@Override
	public int updateReadStatus(String alarmType, int reportRefNo) {
		AdminAlarm alarm = new AdminAlarm();
		alarm.setTypeCode(alarmType.charAt(0));
		alarm.setRefNo(reportRefNo);
		return adminAlarmDao.updateReadStatus(alarm);
	}

	@Override
	public List<AdminAlarm> unReadList() {
		return adminAlarmDao.unReadList();
	}
	
	// 주기적으로 호출되어 읽지 않은 알림을 전송
    @Scheduled(fixedRate = 10000)
    public void processAndSendUnreadAlarms() {
        List<AdminAlarm> unReadAlarms = unReadList();
        alarmSenderService.sendUnreadAlarms(unReadAlarms);
    }

}
