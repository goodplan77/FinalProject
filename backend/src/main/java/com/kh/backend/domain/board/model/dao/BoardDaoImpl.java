package com.kh.backend.domain.board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.commit.model.vo.Comment;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BoardDaoImpl implements BoardDao{

	private final SqlSessionTemplate session;
	
	@Override
	public List<Board> selectBoards() {
		return session.selectList("board.selectBoards");
	}

	@Override
	public List<Board> usedList() {
		return session.selectList("board.usedList");
	}

	@Override
	public List<Board> adoptList() {
		return session.selectList("board.adoptList");
	}

	@Override
	public List<Board> missingList() {
		return session.selectList("board.missingList");
	}

	@Override
	public int insertBoard(Board board) {
		return session.insert("board.insertBoard", board);
	}

	@Override
	public int insertImage(BoardImg boardImg) {
		return session.insert("board.insertImage", boardImg);
	}

	@Override
	public Board boardDetail(int boardNo) {
		return session.selectOne("board.boardDetail", boardNo);
	}

	@Override
	public int insertComment(Comment comment) {
		return session.insert("board.insertComment", comment);
	}

}
