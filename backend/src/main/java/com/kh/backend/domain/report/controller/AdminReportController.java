package com.kh.backend.domain.report.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.report.model.service.ReportService;
import com.kh.backend.domain.report.model.vo.Report;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/report")
@CrossOrigin(origins = { "http://localhost:3014" })
public class AdminReportController {
	
private final ReportService reportService;
	
	@GetMapping("/reportList")
	public List<Report> askList() {
		List<Report> list = reportService.selectList();
		return list;
	}
	
	@GetMapping("/userReportList/{userNo}")
	public List<Report> userReportList(
			@PathVariable int userNo
			){
		List<Report> list = reportService.userReportList(userNo);
		return list;
	}
	
	
}
