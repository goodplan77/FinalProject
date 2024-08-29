package com.kh.backend.domain.comment.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.comment.model.vo.Comment;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CommentDaoImpl implements CommentDao{

	private final SqlSessionTemplate session;

	@Override
	public int deleteComment(Comment comment) {
		return session.update("comment.deleteComment", comment);
	}
	
}
