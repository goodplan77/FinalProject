package com.kh.backend.domain.common;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Utils {
	
	// xss 크로스 사이트 스크립스 공격을 방지하기 위한 메소드
	public static String XSSHandling(String content) {
		if(content != null) {
			content = content.replaceAll("&", "&amp;");
			content = content.replaceAll("<", "&lt;");
			content = content.replaceAll(">", "&gt;");
			content = content.replaceAll("\"", "&quot;");
		}
		return content;
	}
	
	// 개행처리
	// textArea -> \n, p -> <br>
	public static String newLineHandling(String content) {
		return content.replaceAll("(\r\n|\n|\r|\n\r)", "<br>");
	}
	
	// 개행처리 해제
	public static String newLineClear(String content) {
		return content.replaceAll("<br>", "\n");
	}
	
}
