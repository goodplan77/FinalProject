package com.kh.backend.domain.ask.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.ask.model.service.AskService;
import com.kh.backend.domain.ask.model.vo.Ask;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
@CrossOrigin(origins = { "http://localhost:3013" })
public class AskController {
	
	private final AskService askService;
	
	@PostMapping("/insertAsk")
	public Map<String, Object> insertAsk(
			@RequestBody Ask ask 
			) throws Exception {
		
	    Map<String, Object> map = new HashMap<>();
	    int result = askService.insertAsk(ask);
        map.put("ask", ask);            
        return map;
	}
	
//	@GetMapping("/askList")
//	public Map<String, Object> askList(
//			) throws Exception {
//		return null;
//	}
	
}
