package com.kh.backend.domain.user.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.user.model.service.UserService;
import com.kh.backend.domain.user.model.vo.Dog;
import com.kh.backend.domain.user.model.vo.ImgDog;
import com.kh.backend.domain.user.model.vo.ImgUser;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@CrossOrigin(origins = { "http://localhost:3013" , "http://localhost:3014"})
public class FileUserController {
	
	private final UserService userService;
	
	@GetMapping("/{userNo}")
	public ResponseEntity<String> serveUserFile(@PathVariable int userNo) {
	    try {
	        String baseUri = "/images/user/";
	        ImgUser imguser = userService.selectImgUser(userNo);

	        if (imguser == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                                 .body("유저 이미지가 존재하지 않습니다. 유저 번호: " + userNo);
	        }

	        String productImageName = imguser.getChangeName();
	        if (productImageName == null || productImageName.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                                 .body("이미지 파일명이 잘못되었습니다. 유저 번호: " + userNo);
	        }

	        String fullImagePath = baseUri + productImageName;
	        return ResponseEntity.ok(fullImagePath);

	    } catch (DataAccessException e) {
	        // 데이터베이스 관련 예외 처리
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("데이터베이스 오류가 발생했습니다.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("서버 오류가 발생했습니다.");
	    }
	}

	
	@GetMapping("/dog/{userNo}")
	public ResponseEntity<Map<String,Object>> serveUserDogFile(
	        @PathVariable int userNo
	) {
		log.debug("강아지 받아오기 시작");
	    Map<String,Object> response = new HashMap<>();    
	    try {
	    	String baseUri = "/images/dog/";
	
	        List<Dog> dogList = userService.selectDogs(userNo);
	        
	        List<String> dogImgList = new ArrayList<>();
	        
	        for(Dog dog : dogList) {
	        	ImgDog dogImg = userService.selectImgDog(dog.getDogNo());
	        	if(dogImg != null) {
	        		dogImgList.add(baseUri + dogImg.getChangeName());
	        	}
	        }

	        if (dogImgList != null && !dogImgList.isEmpty()) {
	            response.put("imageList", dogImgList);
	            return ResponseEntity.ok(response);
	        } else {
	        	throw new NullPointerException();
	        }
	    } catch (NullPointerException e) {
	    	e.printStackTrace();
	    	response.put("msg", "이미지 파일을 찾을 수 없습니다. 유저 번호:" + userNo);
	    	return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.internalServerError().body(response);
	    }
	}

}
