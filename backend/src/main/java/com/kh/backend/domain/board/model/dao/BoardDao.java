package com.kh.backend.domain.board.model.dao;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.comment.model.vo.Comment;

public interface BoardDao {

	List<Board> selectBoards();

	List<Board> usedList();

	List<Board> adoptList();

	List<Board> missingList();

	int insertBoard(Board board);

	int insertImage(BoardImg boardImg);

	Board boardDetail(int boardNo);

	int insertComment(Comment comment);

	List<Board> selectBoardsTitle(String title);

	List<BoardImg> selectBoardImages(int boardNo);

	int increaseCount(int boardNo);

	List<Board> postedList(int userNo);

	List<Board> likedList(int userNo);

}
