package com.kh.backend.controller;

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
import com.kh.backend.model.service.BoardService;
import com.kh.backend.model.vo.Board;
import com.kh.backend.model.vo.BoardImg;

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
			// 프론트에서 넘어온 첨부파일
			@RequestParam(value = "files" , required = false) List<MultipartFile> files
			) throws Exception {

		//Path path;
		
		
		
		// ObjectMapper를 사용하여 JSON을 Board 객체로 변환해주기
		ObjectMapper objectMapper = new ObjectMapper();
		Board board = objectMapper.readValue(boardJson, Board.class);
		
		Map<String, Object> map = new HashMap<>();

		int result = boardService.insertBoard(board);
		
		if (result > 0 && files!=null) {
			
			for (MultipartFile file : files) {
				BoardImg boardImg = new BoardImg();
				boardImg.setBoardNo(board.getBoardNo());
				boardImg.setOriginName(file.getOriginalFilename());
				
				String filePath = Paths.get("src/main/resources/static").toAbsolutePath().toString();
				log.debug("filePath = {}",filePath);
				
				if(file != null && !file.getOriginalFilename().equals("")) {
					String webPath = "src/main/resources/static/images/board/" + board.getBoardCode() + "/";
					log.debug("Paths.toAbsolutePath = {}", Paths.get(webPath).toAbsolutePath().toString());
					String serverFolderPath = Paths.get(webPath).toAbsolutePath().toString();
					log.debug("serverFolderPath = {}", serverFolderPath);
					
					
					// 디렉토리가 없을때 생성하는 코드
					File dir = new File(serverFolderPath);
					log.debug("dir boolean = {}", dir.exists());
					if(!dir.exists()) {
						dir.mkdirs();
					}
					log.debug("dir boolean = {}", dir.exists());
					
					
					
					// 등록한 이미지 파일의 이름을 수정(5자리 랜덤값으로 부여)
					String originName = file.getOriginalFilename();
					String currentTime = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());
					int random = (int)(Math.random() *  90000 + 10000); // 5자리 랜덤값
					String ext = originName.substring(originName.indexOf("."));
					
					
					
					
					
					
					String changeName = currentTime + random + ext;
					
					try {
						File serverFile = new File(serverFolderPath, changeName);
                        file.transferTo(serverFile);
						log.debug("changeName = {}", changeName);
						log.debug("file = {}", file);
					} catch (IllegalStateException | IOException e) {
						e.printStackTrace();
					}
					
					
				}
				
				// 이미지 DB에 저장
				boardService.insertImage(boardImg);
			}
		}

		map.put("board", board);
		return map;
	}
	
	@GetMapping("/boardDetail/{boardNo}")
	public Board boardDetail(
			@PathVariable int boardNo,
			Model model
			) {
		
		log.debug("boardNo = {}", boardNo);
		
		Board board =  boardService.boardDetail(boardNo);
		
		log.debug("board = {}", board);
		
		return board;
	}
	

}
