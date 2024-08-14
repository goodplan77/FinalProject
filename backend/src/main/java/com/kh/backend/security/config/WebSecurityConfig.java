package com.kh.backend.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

import lombok.RequiredArgsConstructor;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

//@Configuration
//@RequiredArgsConstructor
//@EnableWebSecurity
//public class WebSecurityConfig {
//
//	
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		
//		// 
//		http.cors(corsConfig -> corsConfig.configurationSource(new CorsConfigurationSource() {
//
//			@Override
//			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//				CorsConfiguration config = new CorsConfiguration();
//				config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
//				config.setAllowedMethods(Collections.singletonList("*"));
//				config.setAllowCredentials(true); // jwt사용시에만 이용 가능
//				config.setAllowedHeaders(Collections.singletonList("*"));
//				config.setMaxAge(3600L); // 캐싱 시간 (1시간)
//				
//				return config;
//			}
//			
//		}))
//		.csrf((csrfConfig) -> csrfConfig.disable())
//		.sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션방식의 관리를 사용하지 않는다는 설정 
//		.authorizeHttpRequests((authorizeRequest) -> authorizeRequest
//				.requestMatchers("/auth/login/**").permitAll() // 누구나 이용 가능한 url
//				.requestMatchers("/**").hasRole("USER") // 그 외는 user권한이 필요
//				// .requestMatcher("/admin/**").hasRole("ADMIN")
//				.anyRequest().authenticated())
//		.addFilterBefore(new AuthFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
//		
//		return http.build();
//		
//	}
//	
//}
