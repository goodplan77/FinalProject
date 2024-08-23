package com.kh.backend.common;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public class Utils {

	// 파일 저장 함수
		// 파일을 저장시키면서 파일명을 함께 수정한 후 수정된 파일명을 반환(DB에 저장하기 위해)
		
		public static String saveFile(MultipartFile upfile, String path) {
			// 랜덤 파일명 생성하기
			String originName = upfile.getOriginalFilename();
			String currentTime = new java.text.SimpleDateFormat("yyyyMMddHHmm").format(new java.util.Date());
			int random = (int)(Math.random() * 90000 + 10000); // 10000 이상 99999이하(100000미만 정수값) (5자리의 랜덤값)
			String ext = originName.substring(originName.indexOf(".")); // test.jpg -> .jpg
			
			String changeName = currentTime + random + ext;
			
				try {
					upfile.transferTo(new File(path, changeName));
				} catch (IllegalStateException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
		
			return changeName;
		}
		
		
		// XSS(크로스 사이트 스크립팅, Cross-Site Scripting) 공격을 방지하기 위한 메서드
		public static String XSSHandling(String content) {
			if(content != null) {
				content = content.replaceAll("&", "&amp;");
				content = content.replaceAll("<", "&lt;");
				content = content.replaceAll(">", "&gt;");
				content = content.replaceAll("\"", "&quot;"); // 등등
			}
			return content;
		}
		
		// 개행처리
		// textArea -> \n으로 개행 || p -> <br>로 개행
		public static String newLineHandling(String content) {
			return content.replaceAll("(\r\n|\n|\r|\n\r)", "<br>");
		}
		
		// 내용 수정시 개행처리 해제
		public static String newLineClear(String content) {
			return content.replaceAll("<br>", "\n");
		}
	
}
