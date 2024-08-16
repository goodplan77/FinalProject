package com.kh.backend.domain.board.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.board.model.vo.Product;

public interface AdminBoardService {

	List<Board> selectUserBoards();

	List<Board> selectNotifyBoards();

	List<Board> selectEventBoards();

	List<Board> selectInfoBoards();

	List<Product> selectProductBoards();

	int insertNotifyBoard(Board board);

	int insertEventboard(Board board);

	int insertInfoboard(Board board);

	int insertBoardImages(Board board, MultipartFile file);

	int insertProductBoard(Product product, MultipartFile file);

	String selectProductImages(int productNo);
}
