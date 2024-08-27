package com.kh.backend.domain.report.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.report.model.vo.Report;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReportDaoImpl implements ReportDao{

	private final SqlSessionTemplate session;

	@Override
	public int insertReport(Report report) {
		return session.insert("report.insertReport", report);
	}

	@Override
	public List<Report> selectList() {
		return session.selectList("report.selectList");
	}

	@Override
	public List<Report> userReportList(int userNo) {
		return session.selectList("report.userReportList",userNo);
	}
	
}
