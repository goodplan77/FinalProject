package com.kh.backend.domain.board.controller;

import java.net.http.HttpHeaders;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.board.model.service.AdminBoardService;
import com.kh.backend.domain.board.model.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
@CrossOrigin(origins = { "http://localhost:3014" })
public class FileBoardController {
	
	private final BoardService userBoardService;
	private final AdminBoardService adminBoardService;
	
	@GetMapping("/admin/board/{boardCode}/{boardNo}")
	public ResponseEntity<Map<String,Object>> serveAdminBoardFile(
	        @PathVariable String boardCode,
	        @PathVariable int boardNo
	) {
	    log.debug("파일값 받아오기 시작");
	    Map<String,Object> response = new HashMap<>();    
	    try {
	        String baseUri = "/images/board/"+ boardCode +"/";
	        
	        List<String> productImageNameList = adminBoardService.selectBoardImages(boardNo)
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

	
	
	@GetMapping("/admin/product/{productNo}")
	public ResponseEntity<String> serveProductImagePath(@PathVariable int productNo) {
	    try {
	        // 클라이언트가 접근할 수 있는 기본 URI 설정
	        String baseUri = "/images/board/P/";
	        
	        // 데이터베이스에서 이미지 파일 이름 가져오기
	        String productImageName = adminBoardService.selectProductImages(productNo);

	        if (productImageName != null && !productImageName.isEmpty()) {
	            // 클라이언트가 접근할 수 있는 이미지 경로 생성
	            String fullImagePath = baseUri + productImageName;
	            return ResponseEntity.ok(fullImagePath);
	        } else {
	            // 이미지가 없는 경우 404 상태 반환
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body("이미지 파일을 찾을 수 없습니다. 상품게시글 번호:" + productNo);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        // 서버 오류가 발생한 경우 500 상태 반환
	        return ResponseEntity.internalServerError().body("서버 오류가 발생했습니다.");
	    }
	}


}
