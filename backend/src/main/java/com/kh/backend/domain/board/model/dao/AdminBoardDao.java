package com.kh.backend.domain.board.model.dao;

import java.util.List;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.board.model.vo.Product;

public interface AdminBoardDao {

	List<Board> selectUserBoards();

	List<Board> selectNotifyBoards();

	List<Board> selectEventBoards();

	List<Board> selectInfoBoards();

	List<Product> selectProductBoards();
	
	List<BoardImg> selectBoardImageList();

	int insertNotifyBoard(Board board);

	int insertEventboard(Board board);

	int insertInfoboard(Board board);
	
	int insertBoardImages(BoardImg boardImg);

	int insertProductBoard(Product product);

	String selectProductImages(int productNo);

	int updateBoard(Board board);

	int deleteBoards(Board[] boards);

	BoardImg selectBoardImages(int boardNo);

	int updateBoardImages(BoardImg boardImg);

	int updateProduct(Product product);


}
