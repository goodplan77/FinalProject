package com.kh.backend.domain.report.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.alarm.model.service.AdminAlarmService;
import com.kh.backend.domain.report.model.dao.ReportDao;
import com.kh.backend.domain.report.model.vo.Report;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

	private final ReportDao reportDao;
	private final AdminAlarmService adminAlarmService;

	@Override
	public int insertReport(Report report) {
		// 1. 신고 데이터 삽입
		int result = reportDao.insertReport(report);

		if (result > 0) {
			// 2. 알림 생성 및 전송
			adminAlarmService.createAndSendAlarm('R', report.getReportNo());
		}

		return result;
	}

	@Override
	public List<Report> selectList() {
		return reportDao.selectList();
	}

}
