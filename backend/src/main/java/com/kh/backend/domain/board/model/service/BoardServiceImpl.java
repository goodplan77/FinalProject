package com.kh.backend.domain.board.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.backend.domain.board.model.dao.BoardDao;
import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.comment.model.vo.Comment;
import com.kh.backend.common.Utils;

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
		// 게시글 삽입전 xss파싱처리, 개행 처리를 해야한다.
		
		// 게시글 제목과 내용 가져오기
		String boardTitle = board.getTitle();
		String boardContent = board.getContent();
		
		// 가져온 제목과 내용을 파싱해준다
		boardTitle = Utils.XSSHandling(boardTitle);
		boardContent = Utils.XSSHandling(boardContent);
		boardContent = Utils.newLineClear(boardContent);
		
		// 파싱된 데이터를 삽입한다.
		board.setTitle(boardTitle);
		board.setContent(boardContent);
		
		return boardDao.insertBoard(board);
	}

	@Override
	public int insertImage(BoardImg boardImg) {
		return boardDao.insertImage(boardImg);
	}

	@Override
	public Board boardDetail(int boardNo) {
		return boardDao.boardDetail(boardNo);
	}

	@Override
	public int insertComment(Comment comment) {
		return boardDao.insertComment(comment);
	}

	@Override
	public List<Board> selectBoardsTitle(String title) {
		return boardDao.selectBoardsTitle(title);
	}

	@Override
	public List<BoardImg> selectBoardImages(int boardNo) {
		return boardDao.selectBoardImages(boardNo);
	}

	@Override
	public int updateLikeCount(Board board) {
		return boardDao.updateLikeCount(board);
	}

}
