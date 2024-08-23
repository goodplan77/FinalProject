package com.kh.backend.domain.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.board.model.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
@CrossOrigin(origins = { "http://localhost:3013" })
public class FileBoardController {
	
	private final BoardService boardService;
	
	@GetMapping("/{boardCode}/{boardNo}")
	public ResponseEntity<Map<String,Object>> serveAdminBoardFile(
	        @PathVariable String boardCode,
	        @PathVariable int boardNo
	) {
	    log.debug("파일값 받아오기 시작");
	    Map<String,Object> response = new HashMap<>();    
	    try {
	        String baseUri = "/images/board/"+ boardCode +"/";
	        
	        List<String> productImageNameList = boardService.selectBoardImages(boardNo)
	                .stream()
	                .map(v -> baseUri + v.getChangeName())
	                .toList();

	        if (productImageNameList != null && !productImageNameList.isEmpty()) {
	            response.put("imageList", productImageNameList);
	            return ResponseEntity.ok(response);
	        } else {
	            response.put("msg", "이미지 파일을 찾을 수 없습니다. 상품게시글 번호:" + boardNo);
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.internalServerError().body(response);
	    }
	}

}
