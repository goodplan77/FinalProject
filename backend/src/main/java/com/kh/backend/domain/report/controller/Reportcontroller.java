package com.kh.backend.domain.report.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.report.model.service.ReportService;
import com.kh.backend.domain.report.model.vo.Report;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
@CrossOrigin(origins = { "http://localhost:3013" })
public class Reportcontroller {

	private final ReportService reportService;
	
	@PostMapping("/insertReport")
	public Map<String, Object> insertReport(
			@RequestBody Report report 
			){
		Map<String, Object> map = new HashMap<>();
		log.debug("report = {}",report);
	    int result = reportService.insertReport(report);
        map.put("report", report);            

	    return map;
	}
	
	
	@GetMapping("/reportList")
	public List<Report> reportList(HttpServletResponse response){
		List<Report> list = reportService.selectList();
		
		return list;
	}
	
	
	
}
