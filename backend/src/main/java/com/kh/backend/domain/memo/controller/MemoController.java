package com.kh.backend.domain.memo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.memo.model.service.MemoService;
import com.kh.backend.domain.user.model.vo.Memo;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/calendarPage")
@CrossOrigin(origins = { "http://localhost:3013" })
public class MemoController {
	
	private final MemoService memoService;
	
	@GetMapping("/memoList/{userNo}")
	public List<Memo> memoList(
			HttpServletResponse response,
			@PathVariable int userNo
			){
		List<Memo> list = memoService.selectMemo(userNo);
		log.debug("list = {}", list);
		return list;
	}
	
	@PostMapping("/insertMemo")
	public Map<String, Object> insertMemo(
	        @RequestBody Memo memo // @RequestParam 대신 @RequestBody 사용
	        ) throws Exception {
	    
	    Map<String, Object> map = new HashMap<>();
	    int result = memoService.insertMemo(memo);
        map.put("memo", memo);            

	    return map;
	}

	
	@DeleteMapping("/deleteMemo/{memoNo}")
	public String delectMemo(
			@PathVariable int memoNo
			) {
		int result = memoService.delectMemo(memoNo);
		
		if(result > 0) {
			return memoNo + "번쨰 메모 삭제 성공";
		}else {
			return memoNo + "번쨰 메모 삭제 실패";
		}
	}
	
}
