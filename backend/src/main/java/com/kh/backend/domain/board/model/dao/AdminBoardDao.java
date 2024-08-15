package com.kh.backend.domain.board.model.dao;

import java.util.List;

import com.kh.backend.domain.board.model.vo.Board;

public interface AdminBoardDao {

	List<Board> selectUserBoards();

	List<Board> selectNotifyBoards();

	List<Board> selectEventBoards();

	List<Board> selectInfoBoards();

	int insertNotifyBoard(Board board);

}
