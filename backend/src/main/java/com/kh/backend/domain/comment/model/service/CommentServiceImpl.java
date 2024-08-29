package com.kh.backend.domain.comment.model.service;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.comment.model.dao.CommentDao;
import com.kh.backend.domain.comment.model.vo.Comment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

	private final CommentDao commentDao;

	@Override
	public int deleteComment(Comment comment) {
		return commentDao.deleteComment(comment);
	}
}
