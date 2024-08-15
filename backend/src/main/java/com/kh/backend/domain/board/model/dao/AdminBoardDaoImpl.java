package com.kh.backend.domain.board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.board.model.vo.Board;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AdminBoardDaoImpl implements AdminBoardDao{
	
	private final SqlSessionTemplate session;

	@Override
	public List<Board> selectUserBoards() {
		return session.selectList("adminBoard.selectUserBoards");
	}

	@Override
	public List<Board> selectNotifyBoards() {
		return session.selectList("adminBoard.selectNotifyBoards");
	}

	@Override
	public List<Board> selectEventBoards() {
		return session.selectList("adminBoard.selectEventBoards");
	}

	@Override
	public List<Board> selectInfoBoards() {
		return session.selectList("adminBoard.selectInfoBoards");
	}

	@Override
	public int insertNotifyBoard(Board board) {
		return session.insert("adminBoard.insertNotifyBoard" , board);
	}

}
