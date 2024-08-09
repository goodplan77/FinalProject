package com.kh.backend.model.service;

import java.util.List;

import com.kh.backend.model.vo.Board;

public interface BoardService {

	List<Board> selectBoards();

	List<Board> usedList();

	List<Board> adoptList();

	List<Board> missingList();

}
