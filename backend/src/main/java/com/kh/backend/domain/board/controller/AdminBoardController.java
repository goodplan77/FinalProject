package com.kh.backend.domain.board.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.board.model.service.AdminBoardService;
import com.kh.backend.domain.board.model.vo.Board;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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

	@PostMapping("/insertNofityboard")
	public ResponseEntity<Map<String, String>> insertNofityboard(@RequestBody Board board) {
		Map<String, String> response = new HashMap<>();
		log.debug("board : {}" , board);
		try {
			int result = boardService.insertNotifyBoard(board);
			response.put("msg", "공지사항 글이 성공적으로 작성되었습니다.");
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.put("msg", "에러가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

}
