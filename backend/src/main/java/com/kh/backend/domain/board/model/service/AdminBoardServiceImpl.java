package com.kh.backend.domain.board.model.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.backend.domain.board.model.dao.AdminBoardDao;
import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.board.model.vo.BoardImg;
import com.kh.backend.domain.board.model.vo.Product;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminBoardServiceImpl implements AdminBoardService {

	private final AdminBoardDao boardDao;

	@Override
	public List<Board> selectUserBoards() {
		return boardDao.selectUserBoards();
	}

	@Override
	public List<Board> selectNotifyBoards() {
		return boardDao.selectNotifyBoards();
	}

	@Override
	public List<Board> selectEventBoards() {
		return boardDao.selectEventBoards();
	}

	@Override
	public List<Board> selectInfoBoards() {
		return boardDao.selectInfoBoards();
	}

	@Override
	public List<Product> selectProductBoards() {
		return boardDao.selectProductBoards();
	}
	
	@Override
	public List<Board> selectBoardImageList() {
		return boardDao.selectBoardImageList();
	}
	
	@Override
	public int insertNotifyBoard(Board board) {
		return boardDao.insertNotifyBoard(board);
	}

	@Override
	public int insertEventboard(Board board) {
		return boardDao.insertEventboard(board);
	}

	@Override
	public int insertInfoboard(Board board) {
		return boardDao.insertInfoboard(board);
	}

	@Override
	public int insertBoardImage(Board board, MultipartFile file) {
		BoardImg boardImg = new BoardImg();
		boardImg.setBoardNo(board.getBoardNo());
		boardImg.setOriginName(file.getOriginalFilename());

		if (!file.getOriginalFilename().equals("")) {
			String webPath = "uploads/images/board/" + board.getBoardCode() + "/";
			String serverFolderPath = Paths.get(webPath).toAbsolutePath().toString();

			// 디렉토리가 없을때 생성하는 코드
			File dir = new File(serverFolderPath);
			if (!dir.exists()) {
				dir.mkdirs();
			}

			// 등록한 이미지 파일의 이름을 수정(5자리 랜덤값으로 부여)
			String originName = file.getOriginalFilename();
			String currentTime = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());
			int random = (int) (Math.random() * 90000 + 10000); // 5자리 랜덤값
			String ext = originName.substring(originName.indexOf("."));

			String changeName = currentTime + random + ext;
			boardImg.setChangeName(changeName);

			try {
				File serverFile = new File(serverFolderPath, changeName);
				file.transferTo(serverFile);
				return boardDao.insertBoardImage(boardImg);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
				return 0;
			}
		}
		return 0;
	}

	@Override
	public int insertProductBoard(Product product, MultipartFile file) {
		if (!file.getOriginalFilename().equals("")) {
			String webPath = "uploads/images/board/P";
			String serverFolderPath = Paths.get(webPath).toAbsolutePath().toString();

			// 디렉토리가 없을때 생성하는 코드
			File dir = new File(serverFolderPath);
			if (!dir.exists()) {
				dir.mkdirs();
			}

			// 등록한 이미지 파일의 이름을 수정(5자리 랜덤값으로 부여)
			String originName = file.getOriginalFilename();
			String currentTime = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());
			int random = (int) (Math.random() * 90000 + 10000); // 5자리 랜덤값
			String ext = originName.substring(originName.indexOf("."));

			String changeName = currentTime + random + ext;
			product.setImg(changeName);
			try {
				File serverFile = new File(serverFolderPath, changeName);
				file.transferTo(serverFile);
				return boardDao.insertProductBoard(product);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
				return 0;
			}
		}
		return 0;
	}

	@Override
	public String selectProductImages(int productNo) {
		return boardDao.selectProductImages(productNo);
	}

	@Override
	public int updateBoard(Board board) {
		return boardDao.updateBoard(board);
	}

	@Override
	public int deleteBoards(Board[] boards) {
		return boardDao.deleteBoards(boards);
	}

	@Override
	public List<BoardImg> selectBoardImages(int boardNo) {
		return boardDao.selectBoardImages(boardNo);
	}

	@Override
	public int updateBoardImages(Board board, MultipartFile file) {
		List<BoardImg> boardImgs = boardDao.selectBoardImages(board.getBoardNo());
		
		for(BoardImg boardImg : boardImgs) {
			if (!file.getOriginalFilename().equals("")) {
				String webPath = "uploads/images/board/" + board.getBoardCode() + "/";
				String serverFolderPath = Paths.get(webPath).toAbsolutePath().toString();

				// 디렉토리가 없을때 생성하는 코드
				File dir = new File(serverFolderPath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				// 등록한 이미지 파일의 이름을 수정(5자리 랜덤값으로 부여)
				String originName = file.getOriginalFilename();
				String currentTime = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());
				int random = (int) (Math.random() * 90000 + 10000); // 5자리 랜덤값
				String ext = originName.substring(originName.indexOf("."));

				String changeName = currentTime + random + ext;
				boardImg.setOriginName(originName);
				boardImg.setChangeName(changeName);

				try {
					File serverFile = new File(serverFolderPath, changeName);
					file.transferTo(serverFile);
					return boardDao.updateBoardImages(boardImg);
				} catch (IllegalStateException | IOException e) {
					e.printStackTrace();
					return 0;
				}
			}
		}

		return 0;
	}

	@Override
	public int updateProduct(Product product, MultipartFile file) {
		if(file != null && !file.isEmpty()) {
			String webPath = "uploads/images/board/P/";
			String serverFolderPath = Paths.get(webPath).toAbsolutePath().toString();

			// 디렉토리가 없을때 생성하는 코드
			File dir = new File(serverFolderPath);
			if (!dir.exists()) {
				dir.mkdirs();
			}

			// 등록한 이미지 파일의 이름을 수정(5자리 랜덤값으로 부여)
			String originName = file.getOriginalFilename();
			String currentTime = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());
			int random = (int) (Math.random() * 90000 + 10000); // 5자리 랜덤값
			String ext = originName.substring(originName.indexOf("."));

			String changeName = currentTime + random + ext;
			product.setImg(changeName);
			try {
				File serverFile = new File(serverFolderPath, changeName);
				file.transferTo(serverFile);
				return boardDao.updateProduct(product);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
				return 0;
			}
		} else {
			return boardDao.updateProduct(product);
		}
		
	}

}
