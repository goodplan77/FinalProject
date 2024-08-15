package com.kh.backend.domain.board.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;

public interface AdminBoardService {

	List<Board> selectUserBoards();

	List<Board> selectNotifyBoards();

	List<Board> selectEventBoards();

	List<Board> selectInfoBoards();

	int insertNotifyBoard(Board board);

}
