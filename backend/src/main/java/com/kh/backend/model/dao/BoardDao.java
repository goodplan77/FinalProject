package com.kh.backend.model.dao;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.backend.model.vo.Board;
import com.kh.backend.model.vo.BoardImg;

public interface BoardDao {

	List<Board> selectBoards();

	List<Board> usedList();

	List<Board> adoptList();

	List<Board> missingList();

	int insertBoard(Board board);

	int insertImage(BoardImg boardImg);

	Board boardDetail(int boardNo);



}
