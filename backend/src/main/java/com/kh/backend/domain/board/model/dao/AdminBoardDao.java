package com.kh.backend.domain.board.model.dao;

import java.util.List;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.board.model.vo.Product;
import com.kh.backend.domain.comment.model.vo.Comment;

public interface AdminBoardDao {

	List<Board> selectUserBoards();

	List<Board> selectNotifyBoards();

	List<Board> selectEventBoards();

	List<Board> selectInfoBoards();

	List<Product> selectProductBoards();
	
	List<Board> selectBoardImageList();

	int insertNotifyBoard(Board board);

	int insertEventboard(Board board);

	int insertInfoboard(Board board);
	
	int insertBoardImage(BoardImg boardImg);

	int insertProductBoard(Product product);

	String selectProductImages(int productNo);

	int updateBoard(Board board);

	int deleteBoards(Board[] boards);

	List<BoardImg> selectBoardImages(int boardNo);

	int updateBoardImages(BoardImg boardImg);

	int updateProduct(Product product);

	List<Comment> userCommentList(int userNo);


}
