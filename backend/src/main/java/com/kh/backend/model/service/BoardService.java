package com.kh.backend.model.service;

import java.util.List;

import com.kh.backend.model.vo.Board;
import com.kh.backend.model.vo.BoardImg;

public interface BoardService {

	List<Board> selectBoards();

	List<Board> usedList();

	List<Board> adoptList();

	List<Board> missingList();

	int insertBoard(Board board);

	int insertImage(BoardImg boardImg);

}
