package com.kh.backend.domain.board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.comment.model.vo.Comment;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BoardDaoImpl implements BoardDao{

	private final SqlSessionTemplate session;
	
	@Override
	public List<Board> selectBoards() {
		return session.selectList("board.selectBoards");
	}

	@Override
	public List<Board> usedList() {
		return session.selectList("board.usedList");
	}

	@Override
	public List<Board> adoptList() {
		return session.selectList("board.adoptList");
	}

	@Override
	public List<Board> missingList() {
		return session.selectList("board.missingList");
	}

	@Override
	public int insertBoard(Board board) {
		return session.insert("board.insertBoard", board);
	}

	@Override
	public int insertImage(BoardImg boardImg) {
		return session.insert("board.insertImage", boardImg);
	}

	@Override
	public Board boardDetail(int boardNo) {
		return session.selectOne("board.boardDetail", boardNo);
	}

	@Override
	public int insertComment(Comment comment) {
		return session.insert("board.insertComment", comment);
	}

	@Override
	public List<Board> selectBoardsTitle(String title) {
		return session.selectList("board.selectBoardsTitle", title);
	}

	@Override
	public List<BoardImg> selectBoardImages(int boardNo) {
		return session.selectList("board.selectBoardImages", boardNo);
	}

	@Override
	public int updateLikeCount(Board board) {
		return session.update("board.updateLikeCount" , board);
  }
  
  @Override
	public int increaseCount(int boardNo) {
		return session.update("board.increaseCount", boardNo);
	}

	@Override
	public List<Board> postedList(int userNo) {
		return session.selectList("board.postedList", userNo);
	}

	@Override
	public List<Board> likedList(int userNo) {
		return session.selectList("board.likedList", userNo);
	}

	@Override

	public List<Comment> checkComment(int boardNo) {
		return session.selectList("board.checkComment", boardNo);

	public List<Board> petInfoPage() {
		return session.selectList("board.petInfoPage");

	}

}
