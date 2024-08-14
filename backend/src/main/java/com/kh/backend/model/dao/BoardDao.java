package com.kh.backend.model.dao;

import java.util.List;

import com.kh.backend.domain.user.model.vo.Board;

public interface BoardDao {

	List<Board> selectBoards();

	List<Board> usedList();

	List<Board> adoptList();

	List<Board> missingList();

}
