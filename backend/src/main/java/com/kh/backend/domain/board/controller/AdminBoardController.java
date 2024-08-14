package com.kh.backend.domain.board.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.board.model.service.AdminBoardService;
import com.kh.backend.domain.board.model.service.BoardService;
import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.user.model.vo.User;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/board")
@CrossOrigin(origins = { "http://localhost:3014" })
public class AdminBoardController {
	
	private final AdminBoardService boardService;

	@GetMapping("/UserboardList")
	public List<Board> userBoardList() {

		List<Board> list = boardService.selectUserBoards();
		return list;
	}
	
	@GetMapping("/NofityboardList")
	public List<Board> notifyBoardList(HttpServletResponse response) {

		List<Board> list = boardService.selectNotifyBoards();
		return list;
	}
	
	@GetMapping("/EventboardList")
	public List<Board> EventBoardList(HttpServletResponse response) {

		List<Board> list = boardService.selectEventBoards();
		return list;
	}
	
	@GetMapping("/InfoboardList")
	public List<Board> infoBoardList(HttpServletResponse response) {

		List<Board> list = boardService.selectInfoBoards();
		return list;
	}
	
}
