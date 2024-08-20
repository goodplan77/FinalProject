package com.kh.backend.domain.board.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.backend.domain.board.model.service.BoardService;
import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.commit.model.vo.Comment;

import jakarta.servlet.ServletContext;
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
	private final ServletContext application;
	
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
	        @RequestParam(value = "files" , required = false) List<MultipartFile> files
	        ) throws Exception {

	    // ObjectMapper를 사용하여 JSON을 Board 객체로 변환
	    ObjectMapper objectMapper = new ObjectMapper();
	    Board board = objectMapper.readValue(boardJson, Board.class);
	    
	    Map<String, Object> map = new HashMap<>();
	    int result = boardService.insertBoard(board);

	    if (result > 0 && files != null) {
	        // 디렉토리 생성
	        String uploadDir = Paths.get("src/main/resources/static/images/board/" + board.getBoardCode()).toAbsolutePath().toString(); // A인지 S인지 뭐 이런거
	        File dir = new File(uploadDir);
	        if (!dir.exists()) {
	            dir.mkdirs();
	        }

	        for (MultipartFile file : files) {
	            if (file != null && !file.getOriginalFilename().isEmpty()) {
	                BoardImg boardImg = new BoardImg();
	                boardImg.setBoardNo(board.getBoardNo());
	                
	                String originName = file.getOriginalFilename();
	                String currentTime = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());
	                int random = (int)(Math.random() * 90000 + 10000); // 5자리 랜덤값
	                
	                String ext = originName.substring(originName.lastIndexOf(".")); // .jpg 이런거 잘라내는 용도
	                String changeName = currentTime + random + ext; // 시간 + 랜덤값5자리 + .jpg이런식으로 저장됨
	                
	                boardImg.setOriginName(changeName);
	                
	                File serverFile = new File(uploadDir, changeName);
	                try {
	                    file.transferTo(serverFile);
	                    log.debug("File successfully saved: {}", serverFile.getAbsolutePath());
	                    // 이미지 DB에 저장
	                    boardService.insertImage(boardImg);
	                } catch (IllegalStateException | IOException e) {
	                    log.error("Error saving file: {}", e.getMessage());
	                    e.printStackTrace();
	                }
	            }
	        }
	    }

	    map.put("board", board);
	    return map;
	}

	
	@GetMapping("/boardDetail/{boardNo}")
	public Board boardDetail(
			@PathVariable int boardNo
			) {
		
		log.debug("boardNo = {}", boardNo);
		
		Board board =  boardService.boardDetail(boardNo);
		
		log.debug("board = {}", board);
		
		return board;
	}
	
	@PostMapping("/boardDetail/{boardNo}")
	public Map<String, Object> insertComment(
			@PathVariable int boardNo,
			@RequestParam("content") String content
			) {
		Map<String, Object> map = new HashMap<>();
		
		Comment comment = new Comment();
		
		comment.setBoardNo(boardNo);
		
		int result = boardService.insertComment(comment);
		
		map.put("comment", comment);
		
		log.debug("댓글 내용 = {}", comment.getContent());
		
		return map;
	}
	
	

}
