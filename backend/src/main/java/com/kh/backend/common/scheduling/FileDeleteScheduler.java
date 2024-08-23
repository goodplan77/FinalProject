package com.kh.backend.common.scheduling;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.kh.backend.domain.board.model.service.AdminBoardService;
import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.user.model.service.AdminUserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class FileDeleteScheduler {

	private final AdminBoardService boardService;
	private final AdminUserService userService;
	
	public void deleteFile(String name, String pathURL, List<String> list) {
	    log.debug(name + " 사진 파일 삭제 스케쥴러 시작");

	    try {
	        // 프로젝트 루트 디렉토리에서 상대 경로를 절대 경로로 변환
	        Path path = Paths.get(pathURL).toAbsolutePath();
	        log.debug("Resolved absolute path: {}", path);

	        File directory = path.toFile();

	        if (!directory.exists() || !directory.isDirectory()) {
	            log.debug("디렉토리가 없거나 유효하지 않습니다. 삭제 스케줄러 끝.");
	            return;
	        }

	        File[] files = directory.listFiles();

	        if (files == null) {
	            log.debug("디렉토리가 비어 있습니다. 삭제 스케줄러 끝.");
	            return;
	        }

	        List<File> filesList = Arrays.asList(files);
	        log.debug("현재 서버에 저장된 파일 목록 : {}", filesList);

	        for (File serverFile : filesList) {
	            String fileName = serverFile.getName();

	            if (!list.contains(fileName)) {
	                log.debug(fileName + "을 삭제합니다.");
	                boolean deleted = serverFile.delete();
	                if (!deleted) {
	                    log.error("파일 삭제에 실패했습니다: " + fileName);
	                }
	            }
	        }

	        log.debug(name + " 사진 파일 삭제 스케쥴러 끝");
	    } catch (Exception e) {
	        log.error("파일 경로를 읽어오는 데 실패했습니다.", e);
	    }
	}
	
	public List<String> selectBoardTypeImageList (List<Board> imageList , char boardCode){
		return imageList.stream()
				.filter(board->board.getBoardCode() == boardCode)
				.flatMap(board -> board.getBoardImg().stream()) // 각 Board의 BoardImg 리스트를 스트림으로 변환
				.map(boardimg -> boardimg.getChangeName())
				.toList();
	}


//	@Scheduled(cron = "1 * * * * *")
//	public void deleteUserImgFile() {
//		deleteFile("회원" , "uploads/images/user/img" , null);
//	}
//
//	@Scheduled(cron = "1 * * * * *")
//	public void deleteDogImgFile() {
//
//	}
//
	@Scheduled(cron = "10 0 0 * * *")
	public void deleteUserBoardFile() {
		log.debug("-----전체 게시판 사진 파일 삭제 스케쥴러 시작-----");
			List<Board> imageList = boardService.selectBoardImageList(); // 게시판 테이블 타입 코드를 받아오기 위해 게시판 타입으로 받아옴
			deleteFile("회원 일반 게시판" , "uploads/images/board/C/" , selectBoardTypeImageList(imageList,'C'));
			deleteFile("회원 중고 게시판" , "uploads/images/board/S/" , selectBoardTypeImageList(imageList,'S'));
			deleteFile("회원 입양 게시판" , "uploads/images/board/A/" , selectBoardTypeImageList(imageList,'A'));
			deleteFile("회원 실종 게시판" , "uploads/images/board/M/" , selectBoardTypeImageList(imageList,'M'));
			deleteFile("관리자 정보 게시판" , "uploads/images/board/I/" , selectBoardTypeImageList(imageList,'I'));
			deleteFile("관리자 이벤트 게시판" , "uploads/images/board/E/" , selectBoardTypeImageList(imageList,'E'));
		log.debug("-----전체 게시판 사진 파일 삭제 스케쥴러 끝-----");

	}

	@Scheduled(cron = "10 1 0 * * *")
	public void deleteProductFile() {
		deleteFile("상품" , "uploads/images/board/P/" , boardService.selectProductBoards().stream().map(v->v.getImg()).toList());
	}

}
