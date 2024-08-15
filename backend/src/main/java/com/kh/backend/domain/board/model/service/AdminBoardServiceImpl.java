package com.kh.backend.domain.board.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.board.model.dao.AdminBoardDao;
import com.kh.backend.domain.board.model.vo.Board;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminBoardServiceImpl implements AdminBoardService{

	private final AdminBoardDao boardDao;
	
	@Override
	public List<Board> selectUserBoards() {
		return boardDao.selectUserBoards();
	}

	@Override
	public List<Board> selectNotifyBoards() {
		return boardDao.selectNotifyBoards();
	}

	@Override
	public List<Board> selectEventBoards() {
		return boardDao.selectEventBoards();
	}

	@Override
	public List<Board> selectInfoBoards() {
		return boardDao.selectInfoBoards();
	}

	@Override
	public int insertNotifyBoard(Board board) {
		return boardDao.insertNotifyBoard(board);
	}

}
