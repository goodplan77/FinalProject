package com.kh.backend.domain.user.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
}
