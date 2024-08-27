package com.kh.backend.domain.report.model.service;

import java.util.List;

import com.kh.backend.domain.report.model.vo.Report;

public interface ReportService {

	int insertReport(Report report);

	List<Report> selectList();

	List<Report> userReportList(int userNo);

}
