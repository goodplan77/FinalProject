package com.kh.backend.domain.comment.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.comment.model.service.CommentService;
import com.kh.backend.domain.comment.model.vo.Comment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
@CrossOrigin(origins = { "http://localhost:3013" }, allowCredentials = "true")
public class CommentController {
	
	private final CommentService commentService;
	
	@PostMapping("/deleteComment")
	public int deleteComment(
			@RequestBody Comment comment
			) {
		int result = commentService.deleteComment(comment);
		
		return result;
	}
	
	
	
}
