package com.kh.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.model.service.BoardService;
import com.kh.backend.model.vo.Board;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
@CrossOrigin(origins = {"http://localhost:3013"})
public class BoardController {
	
	private final  BoardService boardService;
	
	@GetMapping("/boardList")
	public List<Board> boardList(HttpServletResponse response){
		
		List<Board> list = boardService.selectBoards();
		log.debug("list = {}", list);
		
		return list;
	}
	
	@GetMapping("/usedList")
	public List<Board> usedList(HttpServletResponse response){
		
		List<Board> list = boardService.usedList();
		log.debug("list = {}", list);
		
		return list;
	}
	
	@GetMapping("/adoptList")
	public List<Board> adoptList(HttpServletResponse response){
		
		List<Board> list = boardService.adoptList();
		log.debug("list = {}", list);
		
		return list;
	}
	
	@GetMapping("/missingList")
	public List<Board> missingList(HttpServletResponse response){
		
		List<Board> list = boardService.missingList();
		log.debug("missingList = {}" , list);
		
		return list;
	}
	
	@PostMapping("/insertBoard")
	public List<Board> insertBoard(HttpServletResponse response){
		
		
		
		return null;
	}
}
