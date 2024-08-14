package com.kh.backend.admin;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.model.service.BoardService;
import com.kh.backend.model.vo.Board;
import com.kh.backend.model.vo.User;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@CrossOrigin(origins = { "http://localhost:3014" })
public class AdminController {
	
	private final BoardService boardService;

	@GetMapping("/boardList")
	public List<Board> boardList(HttpServletResponse response) {

		List<Board> list = boardService.selectBoards();
		return list;
	}
	
}
