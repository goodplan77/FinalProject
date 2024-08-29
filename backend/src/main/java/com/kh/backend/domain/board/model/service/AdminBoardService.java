package com.kh.backend.domain.board.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.board.model.vo.Product;
import com.kh.backend.domain.comment.model.vo.Comment;

public interface AdminBoardService {

	List<Board> selectUserBoards();

	List<Board> selectNotifyBoards();

	List<Board> selectEventBoards();

	List<Board> selectInfoBoards();

	List<Product> selectProductBoards();
	
	List<Board> selectBoardImageList();

	int insertNotifyBoard(Board board);

	int insertEventboard(Board board);

	int insertInfoboard(Board board);

	int insertBoardImage(Board board, MultipartFile file);

	int insertProductBoard(Product product, MultipartFile file);

	String selectProductImages(int productNo);

	int updateBoard(Board board);

	int deleteBoards(Board[] boards);

	List<BoardImg> selectBoardImages(int boardNo);

	int updateBoardImages(Board board, MultipartFile file);

	int updateProduct(Product product, MultipartFile file);

	List<Comment> userCommentList(int userNo);

	int deleteProduct(Product product);

	List<Comment> boardCommentList(int boardNo);
	
}
