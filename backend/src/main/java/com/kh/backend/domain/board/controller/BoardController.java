package com.kh.backend.domain.board.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
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
import com.kh.backend.domain.comment.model.vo.Comment;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
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
	        String uploadDir = Paths.get("uploads/images/board/" + board.getBoardCode()).toAbsolutePath().toString(); // A인지 S인지 뭐 이런거
	        File dir = new File(uploadDir);
	        if (!dir.exists()) {
	            dir.mkdirs();
	        }

	        for (MultipartFile file : files) {
	            if (file != null && !file.getOriginalFilename().isEmpty()) {
	                BoardImg boardImg = new BoardImg();
	                boardImg.setOriginName(file.getOriginalFilename());
	                boardImg.setBoardNo(board.getBoardNo());
	                
	                String originName = file.getOriginalFilename();
	                String currentTime = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());
	                int random = (int)(Math.random() * 90000 + 10000); // 5자리 랜덤값
	                
	                String ext = originName.substring(originName.lastIndexOf(".")); // .jpg 이런거 잘라내는 용도
	                String changeName = currentTime + random + ext; // 시간 + 랜덤값5자리 + .jpg이런식으로 저장됨
	                
	                boardImg.setChangeName(changeName);
	                
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
			@PathVariable int boardNo,
			HttpServletRequest req,
			HttpServletResponse res
			) {
		
		log.debug("boardNo = {}", boardNo);
		
		Board board =  boardService.boardDetail(boardNo);
		
		log.debug("board = {}", board);
		
		if(board != null) {
			Cookie cookie = null;
			
			Cookie[] cookies = req.getCookies();
			
			if(cookies != null && cookies.length > 0) {
				for(Cookie c : cookies) {
					log.debug("Existing cookie: {} = {}", c.getName(), c.getValue());
					if("readBoardNo".equals(c.getName())) {
						cookie = c;
						break;
					}
				}
			}
			
			int result = 0;
			if(cookie == null) {
				//readBoardNo쿠키 생성
				cookie = new Cookie("readBoardNo", boardNo+"" );
				log.debug("New cookie created: {} = {}", cookie.getName(), cookie.getValue());
				// 조회수 증가서비스 호출
				result = boardService.increaseCount(boardNo);
			} else {
				// 기존 쿠키값중에 중복되는 게시글번호가 없는 경우 조회수 증가서비스 호출,
				// readBoardNo에 현재 게시글번호 추가
				String[] arr = cookie.getValue().split("/");
				List<String> list = Arrays.asList(arr); // 메서드 사용을 위한 변환
				if(list.indexOf(boardNo+"" ) == -1) { // 조회결과가 없다면
					// 조회수 증가서비스호출
					result = boardService.increaseCount(boardNo);
					// 쿠키값에 현재 게시글번호 추차
					cookie.setValue(cookie.getValue()+"/"+boardNo);
					log.debug("Updated cookie value: {} = {}", cookie.getName(), cookie.getValue());
				}
				// 중복되는 게시글번호가 이미 존재하는경우 종료
			}
			if(result > 0) {
				board.setViews(board.getViews()+1);
				cookie.setPath(req.getContextPath());
				cookie.setMaxAge(24 * 60 * 60);
				res.addCookie(cookie);
				log.debug("Updated cookie value: {} = {}", cookie.getName(), cookie.getValue());
			}
		}
		
		
		return board;
	}
	
	
	
	@PostMapping("/boardDetail/{boardNo}")
	public Map<String, Object> insertComment(
			@PathVariable int boardNo,
			@RequestBody Comment comment
			) {
		log.debug("comment = {}", comment);
		Map<String, Object> map = new HashMap<>();
		
		comment.setBoardNo(boardNo);
		
		int result = boardService.insertComment(comment);
		
		map.put("comment", comment);
		
		log.debug("댓글 내용 = {}", comment.getContent());
		log.debug("유저 넘버 = {}", comment.getUserNo());
		
		return map;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@GetMapping("/searchTitle/{title}")
	public List<Board> searchTitle(
			@PathVariable String title
			){
		log.debug(title);
		
		List<Board> list = boardService.selectBoardsTitle(title);
		
		return list;
	}
	
	
}
