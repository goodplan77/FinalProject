package com.kh.backend.domain.report.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.report.model.dao.ReportDao;
import com.kh.backend.domain.report.model.vo.Report;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

	private final ReportDao reportDao;

	@Override
	public int insertReport(Report report) {
		return reportDao.insertReport(report);
	}

	@Override
	public List<Report> selectList() {
		return reportDao.selectList();
	}
	
}
