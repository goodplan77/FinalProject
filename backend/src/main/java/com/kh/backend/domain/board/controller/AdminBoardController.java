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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.domain.board.model.service.AdminBoardService;
import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.Product;

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
	
	@GetMapping("/ProductboardList")
	public List<Product> ProductboardList(HttpServletResponse response) {
		List<Product> list = boardService.selectProductBoards();
		return list;
	}

	@PostMapping("/insertNofityboard")
	public ResponseEntity<Map<String, String>> insertNofityboard(@RequestBody Board board) {
		Map<String, String> response = new HashMap<>();
		try {
			int result = boardService.insertNotifyBoard(board);
			if (result > 0) {
				response.put("msg", "공지사항 글이 성공적으로 작성되었습니다.");
				return ResponseEntity.ok(response);				
			} else {
				response.put("msg", "데이터 처리중 문제가 발생했습니다.");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			}
		} catch (Exception e) {
			response.put("msg", "에러가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
	
	@PostMapping("/insertEventboard")
	public ResponseEntity<Map<String, String>> insertEventboard(
			@RequestPart String boardJson,
			// 프론트에서 넘어온 첨부파일
			@RequestPart MultipartFile file
			) throws Exception {
		
		ObjectMapper objectMapper = new ObjectMapper();
		Board board = objectMapper.readValue(boardJson, Board.class);
		
		Map<String, String> response = new HashMap<>();
		
		try {
			int result = boardService.insertEventboard(board);
			
			if(!file.isEmpty()) {
				result *= boardService.insertBoardImages(board , file);
			}
			
			if (result > 0) {
				response.put("msg", "이벤트 글이 성공적으로 작성되었습니다.");
				return ResponseEntity.ok(response);				
			} else {
				response.put("msg", "데이터 처리중 문제가 발생했습니다.");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			}

		} catch (Exception e) {
			response.put("msg", "에러가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
	
	@PostMapping("/insertInfoboard")
	public ResponseEntity<Map<String, String>> insertInfoboard(
			@RequestPart String boardJson,
			// 프론트에서 넘어온 첨부파일
			@RequestPart MultipartFile file
			) throws Exception {
		
		ObjectMapper objectMapper = new ObjectMapper();
		Board board = objectMapper.readValue(boardJson, Board.class);
		
		Map<String, String> response = new HashMap<>();
		
		try {
			int result = boardService.insertInfoboard(board);
			
			if(!file.isEmpty()) {
				result *= boardService.insertBoardImages(board , file);
			}
			
			if (result > 0) {
				response.put("msg", "정보 글이 성공적으로 작성되었습니다.");
				return ResponseEntity.ok(response);				
			} else {
				response.put("msg", "데이터 처리중 문제가 발생했습니다.");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			}

		} catch (Exception e) {
			response.put("msg", "에러가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
	
	@PostMapping("/insertProductBoard")
	public ResponseEntity<Map<String, String>> insertProductBoard(
			@RequestPart String productJson,
			@RequestPart MultipartFile file
			) throws Exception {
		
		ObjectMapper objectMapper = new ObjectMapper();
		Product product = objectMapper.readValue(productJson, Product.class);
		
		Map<String, String> response = new HashMap<>();
		
		try {
			int result = boardService.insertProductBoard(product , file);
			
			
			if (result > 0) {
				response.put("msg", "포인트 상품이 정상적으로 등록 되었습니다.");
				return ResponseEntity.ok(response);				
			} else {
				response.put("msg", "데이터 처리중 문제가 발생했습니다.");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			}

		} catch (Exception e) {
			response.put("msg", "에러가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

}
