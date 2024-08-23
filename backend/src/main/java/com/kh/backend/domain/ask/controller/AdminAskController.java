package com.kh.backend.domain.ask.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.domain.ask.model.service.AskService;
import com.kh.backend.domain.ask.model.vo.Ask;
import com.kh.backend.domain.board.model.vo.Board;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;



@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/ask")
@CrossOrigin(origins = { "http://localhost:3014" })
public class AdminAskController {
	
	private final AskService askService;
	
	@GetMapping("/askList")
	public List<Ask> askList() {
		return askService.selectAskList();
	}
	
	@PostMapping("/updateAsk")
	public ResponseEntity<Map<String, Object>> updateAsk(@RequestBody Ask ask) {
		Map<String, Object> response = new HashMap<>();
		try {
//			ObjectMapper objectMapper = new ObjectMapper();
//			Ask ask = objectMapper.readValue(askJson, Ask.class);

			int result = askService.updateAsk(ask);

			if (result > 0) {
				response.put("msg", "문의 처리가 정상적으로 완료 되었습니다.");
				return ResponseEntity.ok(response);
			} else {
				response.put("msg", "데이터 처리중 문제가 발생했습니다. : 트랜잭션 처리 문제");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			}

		} catch (Exception e) {
			e.printStackTrace();
			response.put("msg", "에러가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
	
	
}
