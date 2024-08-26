package com.kh.backend.domain.ask.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.alarm.model.service.AdminAlarmService;
import com.kh.backend.domain.ask.model.dao.AskDao;
import com.kh.backend.domain.ask.model.vo.Ask;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AskServiceImpl implements AskService {

	private final AskDao askDao;
	private final AdminAlarmService adminAlarmService;

	@Override
	public int insertAsk(Ask ask) {
		// 1. 신고 데이터 삽입
		int result = askDao.insertAsk(ask);

		if (result > 0) {
			// 2. 알림 생성 및 전송
			adminAlarmService.createAndSendAlarm('A', ask.getAskNo());
		}
		return result;
	}

	// 관리자용
	@Override
	public List<Ask> selectAskList() {
		return askDao.selectAskList();
	}

	@Override
	public int updateAsk(Ask ask) {
		return askDao.updateAsk(ask);
	}

}
