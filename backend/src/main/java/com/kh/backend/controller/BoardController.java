package com.kh.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.model.service.BoardService;
import com.kh.backend.model.vo.Board;
import com.kh.backend.model.vo.BoardImg;

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
			@RequestParam(value = "files" , required = false) List<MultipartFile> files) throws Exception {

		ObjectMapper objectMapper = new ObjectMapper();
		Board board = objectMapper.readValue(boardJson, Board.class);

		Map<String, Object> map = new HashMap<>();

		int result = boardService.insertBoard(board);

		if (result > 0 && files!=null) {
			for (int i = 0; i < files.size(); i++) {
				BoardImg boardImg = new BoardImg();
				boardImg.setBoardNo(board.getBoardNo());
				boardImg.setOriginName(files.get(i).getOriginalFilename());
				boardService.insertImage(boardImg);
			}
		}

		map.put("board", board);
		return map;
	}

}
