package com.kh.backend.domain.board.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< HEAD:backend/src/main/java/com/kh/backend/domain/board/model/service/BoardServiceImpl.java
import com.kh.backend.domain.board.model.dao.BoardDao;
import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
=======
import com.kh.backend.domain.user.model.vo.Board;
import com.kh.backend.model.dao.BoardDao;
>>>>>>> jayhp:backend/src/main/java/com/kh/backend/model/service/BoardServiceImpl.java

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

	private final BoardDao boardDao;
	
	@Override
	public List<Board> selectBoards() {
		return boardDao.selectBoards();
	}

	@Override
	public List<Board> usedList() {
		return boardDao.usedList();
	}

	@Override
	public List<Board> adoptList() {
		return boardDao.adoptList();
	}

	@Override
	public List<Board> missingList() {
		return boardDao.missingList();
	}

	@Override
	public int insertBoard(Board board) {
		return boardDao.insertBoard(board);
	}

	@Override
	public int insertImage(BoardImg boardImg) {
		return boardDao.insertImage(boardImg);
	}




}
