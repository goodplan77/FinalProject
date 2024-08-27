package com.kh.backend.domain.report.model.dao;

import java.util.List;

import com.kh.backend.domain.report.model.vo.Report;

public interface ReportDao {

	int insertReport(Report report);

	List<Report> selectList();

	List<Report> userReportList(int userNo);

}
