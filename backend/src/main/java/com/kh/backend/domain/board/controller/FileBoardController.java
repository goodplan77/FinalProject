package com.kh.backend.domain.board.controller;

import java.net.http.HttpHeaders;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
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
public class FileBoardController {
	
	private final BoardService userBoardService;
	private final AdminBoardService adminBoardService;
	
	@GetMapping("/admin/product/{productNo}")
	public ResponseEntity<Resource> serveProductFile(@PathVariable int productNo) {
        try {
            String productImagePath = "/images/board/admin/P/";
            String productImageName = adminBoardService.selectProductImages(productNo);

            if (productImageName != null && !productImageName.isEmpty()) {
                Path filePath = Paths.get("src/main/resources/static" + productImagePath + productImageName).normalize();
                Resource resource = new UrlResource(filePath.toUri());

                if (resource.exists() && resource.isReadable()) {
                    return ResponseEntity.ok()
                            .body(resource);
                } else {
                    throw new RuntimeException("파일을 읽을 수가 없습니다.");
                }
            } else {
                throw new RuntimeException("이미지 파일을 찾을 수 없습니다. 상품게시글 번호:" + productNo);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
