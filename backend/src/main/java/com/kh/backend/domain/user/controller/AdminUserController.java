package com.kh.backend.domain.user.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.board.model.service.AdminBoardService;
import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.user.model.service.AdminUserService;
import com.kh.backend.domain.user.model.vo.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/user")
@CrossOrigin(origins = {"http://localhost:3014"})
public class AdminUserController {
	
	private final AdminUserService userService;
	
	@GetMapping("/UserList")
	public List<User> userBoardList() {
		List<User> list = userService.selectUsers();
		return list;
	}
	
	@GetMapping("/UserDetail/{userNo}")
	public ResponseEntity<Map<String, Object>> userBoardList(
			@PathVariable int userNo
			) {
		Map<String,Object> response = new HashMap<>();
		try {
			User user = userService.selectUserOne(userNo);
			if(user!=null) {
				response.put("user", user);
				return ResponseEntity.ok(response);
			} else {
				response.put("msg", "데이터 처리중 문제가 발생했습니다.");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.put("msg", "에러가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		
	}
}
