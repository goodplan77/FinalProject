package com.kh.backend.domain.board.controller;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import com.kh.backend.domain.comment.model.vo.Comment;

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

	@GetMapping("/ProductboardList")
	public List<Product> ProductboardList(HttpServletResponse response) {
		List<Product> list = boardService.selectProductBoards();
		return list;
	}

	@PostMapping("/insertNofityboard")
	public ResponseEntity<Map<String, Object>> insertNofityboard(@RequestBody Board board) {

		Map<String, Object> response = new HashMap<>();
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
	public ResponseEntity<Map<String, Object>> insertEventboard(@RequestPart String boardJson,
			// 프론트에서 넘어온 첨부파일
			@RequestPart(required = false) MultipartFile file) throws Exception {

		ObjectMapper objectMapper = new ObjectMapper();
		Board board = objectMapper.readValue(boardJson, Board.class);

		Map<String, Object> response = new HashMap<>();

		try {
			int result = boardService.insertEventboard(board);

			if (file != null && !file.isEmpty()) {
				result *= boardService.insertBoardImage(board, file);
			}

			if (result > 0) {
				response.put("msg", "이벤트 글이 성공적으로 작성되었습니다.");
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

	@PostMapping("/insertInfoboard")
	public ResponseEntity<Map<String, Object>> insertInfoboard(@RequestPart String boardJson,
			// 프론트에서 넘어온 첨부파일
			@RequestPart(required = false) MultipartFile file) throws Exception {

		ObjectMapper objectMapper = new ObjectMapper();
		Board board = objectMapper.readValue(boardJson, Board.class);

		Map<String, Object> response = new HashMap<>();

		try {
			int result = boardService.insertInfoboard(board);

			if (file != null && !file.isEmpty()) {
				result *= boardService.insertBoardImage(board, file);
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
	public ResponseEntity<Map<String, Object>> insertProductBoard(@RequestPart String productJson,
			@RequestPart MultipartFile file) throws Exception {

		String decodedJson = URLDecoder.decode(productJson, StandardCharsets.UTF_8.toString());
		log.debug("data : {}" , decodedJson);
		ObjectMapper objectMapper = new ObjectMapper();
		Product product = objectMapper.readValue(decodedJson, Product.class);

		Map<String, Object> response = new HashMap<>();

		try {
			int result = boardService.insertProductBoard(product, file);

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

	@PostMapping("/updateBoard")
	public ResponseEntity<Map<String, Object>> changeBoard(@RequestBody Board board) {
		Map<String, Object> response = new HashMap<>();

		try {

			int result = boardService.updateBoard(board);

			if (result > 0) {
				response.put("msg", "게시글 수정 작업이 정상적으로 완료 되었습니다.");
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
	
	@PostMapping("/updateBoardFormData")
	public ResponseEntity<Map<String, Object>> changeBoardwithFile(
			@RequestPart String boardJson,
			@RequestPart(required = false) MultipartFile file)  throws Exception{
		Map<String, Object> response = new HashMap<>();
		
		ObjectMapper objectMapper = new ObjectMapper();
		Board board = objectMapper.readValue(boardJson, Board.class);

		try {

			int result = boardService.updateBoard(board);
			
			if (file != null && !file.isEmpty()) {
				result *= boardService.updateBoardImages(board, file);
			}

			if (result > 0) {
				response.put("msg", "게시글 수정 작업이 정상적으로 완료 되었습니다.");
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

	@PostMapping("/deleteboards")
	public ResponseEntity<Map<String, Object>> deleteboards(@RequestBody Board[] boards) {
		Map<String, Object> response = new HashMap<>();

		try {

			int result = boardService.deleteBoards(boards);

			if (result > 0) {
				response.put("msg", "게시글 삭제 작업이 정상적으로 완료 되었습니다.");
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
	
	@PostMapping("/updateProduct")
	public ResponseEntity<Map<String, Object>> updateProduct(
			@RequestPart String productJson,
			@RequestPart(required = false) MultipartFile file) throws Exception {

		ObjectMapper objectMapper = new ObjectMapper();
		Product product = objectMapper.readValue(productJson, Product.class);

		Map<String, Object> response = new HashMap<>();
		
		log.debug("product : {}" , product);

		try {
			int result = boardService.updateProduct(product, file);

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
	
	@GetMapping("/comment/{userNo}")
	public List<Comment> userCommentList(
			@PathVariable int userNo
			){
		List<Comment> list = boardService.userCommentList(userNo);
		return list;
	}
}
