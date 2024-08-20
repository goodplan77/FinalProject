package com.kh.backend.domain.board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.board.model.vo.Product;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AdminBoardDaoImpl implements AdminBoardDao{
	
	private final SqlSessionTemplate session;

	@Override
	public List<Board> selectUserBoards() {
		return session.selectList("adminBoard.selectUserBoards");
	}

	@Override
	public List<Board> selectNotifyBoards() {
		return session.selectList("adminBoard.selectNotifyBoards");
	}

	@Override
	public List<Board> selectEventBoards() {
		return session.selectList("adminBoard.selectEventBoards");
	}

	@Override
	public List<Board> selectInfoBoards() {
		return session.selectList("adminBoard.selectInfoBoards");
	}
	
	@Override
	public List<Product> selectProductBoards() {
		return session.selectList("adminBoard.selectProductBoards");
	}

	@Override
	public int insertNotifyBoard(Board board) {
		return session.insert("adminBoard.insertNotifyBoard" , board);
	}

	@Override
	public int insertEventboard(Board board) {
		return session.insert("adminBoard.insertEventboard" , board);
	}
	
	
	@Override
	public int insertInfoboard(Board board) {
		return session.insert("adminBoard.insertInfoboard" , board);
	}

	@Override
	public int insertBoardImages(BoardImg boardImg) {
		return session.insert("adminBoard.insertBoardImages" , boardImg);
	}

	@Override
	public int insertProductBoard(Product product) {
		return session.insert("adminBoard.insertProductBoard" , product);
	}

	@Override
	public String selectProductImages(int productNo) {
		return session.selectOne("adminBoard.selectProductImages" , productNo);
	}

	@Override
	public int updateBoard(Board board) {
		return session.update("adminBoard.updateBoard" , board);
	}

	@Override
	public int deleteBoards(Board[] boards) {
		return session.update("adminBoard.deleteBoards" , boards);
	}

	@Override
	public BoardImg selectBoardImages(int boardNo) {
		return session.selectOne("adminBoard.selectBoardImages" , boardNo);
	}

	@Override
	public int updateBoardImages(BoardImg boardImg) {
		return session.update("adminBoard.updateBoardImages" , boardImg);
	}

	@Override
	public int updateProduct(Product product) {
		return session.update("adminBoard.updateProduct" , product);
	}

}
