package com.kh.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.model.service.BoardService;
import com.kh.backend.model.vo.Board;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
@CrossOrigin(origins = { "http://localhost:3013" })
public class BoardController {

	private final BoardService boardService;

	@GetMapping("/boardList")
	public List<Board> boardList(HttpServletResponse response) {

		List<Board> list = boardService.selectBoards();
		log.debug("list = {}", list);

		return list;
	}

	@GetMapping("/usedList")
	public List<Board> usedList(HttpServletResponse response) {

		List<Board> list = boardService.usedList();
		log.debug("list = {}", list);

		return list;
	}

	@GetMapping("/adoptList")
	public List<Board> adoptList(HttpServletResponse response) {

		List<Board> list = boardService.adoptList();
		log.debug("list = {}", list);

		return list;
	}

	@GetMapping("/missingList")
	public List<Board> missingList(HttpServletResponse response) {

		List<Board> list = boardService.missingList();
		log.debug("missingList = {}", list);

		return list;
	}

	@PostMapping("/insertBoard")
	public Map<String, Object> insertBoard(
			@RequestParam("board") String boardJson,
			@RequestParam("file1") MultipartFile file1
			) throws Exception {
		
		ObjectMapper objectMapper = new ObjectMapper();
        Board board = objectMapper.readValue(boardJson, Board.class);
		
        log.debug("board = {}", board);
		
		Map<String, Object> map = new HashMap<>();
		
		int result1 = boardService.insertBoard(board);
		
		// int result2 = boardService.insertImage(boardImg);
		
		if(result1 > 0) {
			map.put("msg", "게시글을 등록하였습니다.");
		}else {
			map.put("msg", "게시글 등록에 실패하였습니다.");
		}
		
		return map;
	}

}
