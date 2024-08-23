package com.kh.backend.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// uploads 폴더의 이미지 파일을 /images/ 경로로 매핑
		// 일반 게시판 C 이미지 경로 매핑
		registry.addResourceHandler("/images/board/C/**").addResourceLocations("file:uploads/images/board/C/").setCachePeriod(0);

		// 일반 게시판 S 이미지 경로 매핑
		registry.addResourceHandler("/images/board/S/**").addResourceLocations("file:uploads/images/board/S/").setCachePeriod(0);

		// 일반 게시판 A 이미지 경로 매핑
		registry.addResourceHandler("/images/board/A/**").addResourceLocations("file:uploads/images/board/A/").setCachePeriod(0);

		// 일반 게시판 M 이미지 경로 매핑
		registry.addResourceHandler("/images/board/M/**").addResourceLocations("file:uploads/images/board/M/").setCachePeriod(0);

		// 관리자 게시판 I 이미지 경로 매핑
		registry.addResourceHandler("/images/board/I/**").addResourceLocations("file:uploads/images/board/I/").setCachePeriod(0);

		// 관리자 게시판 I 이미지 경로 매핑
		registry.addResourceHandler("/images/board/E/**").addResourceLocations("file:uploads/images/board/E/").setCachePeriod(0);

		// 상품 게시판 P 이미지 경로 매핑
		registry.addResourceHandler("/images/board/P/**").addResourceLocations("file:uploads/images/board/P/").setCachePeriod(0);

	}
}
