package com.kh.backend.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

import com.kh.backend.security.filter.AuthFilter;
import com.kh.backend.security.jwt.JwtProvider;

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

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {

	private final JwtProvider jwtProvider;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		// 보안상 필요한 메서드들(로그인 필터, cors필터 등)을 메서드 체인 형태로 구현
		
		// 현재버전 스프링 시큐리티의 cors설정 (메뉴얼)
		// cors설정
		http.cors(corsConfig -> corsConfig.configurationSource(new CorsConfigurationSource() {

			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				
				CorsConfiguration config = new CorsConfiguration();
				
				config.setAllowedOrigins(Collections.singletonList("http://localhost:3013")); // 요청이 왔을 때 허용할 오리진
				config.setAllowedMethods(Collections.singletonList("*")); // 요청이 왔을 때 허용할 메서드
				config.setAllowCredentials(true); // 요청시 인증정보를 포함할 지 여부 true => jwt사용시에만 이용 가능으로 설정
				config.setAllowedHeaders(Collections.singletonList("*")); // 허용할 헤더 => 전부
				config.setMaxAge(3600L); // 요청 정보를 저장할 캐싱 시간 => 1시간
				
				return config;
			}
			
		}))
		.csrf((csrfConfig) -> csrfConfig.disable()) // Cross Site Request Forgery(사이트 간 요청 위조)
		.sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
		// 스프링 시큐리티의 기본적인 인증정보 관리 방식인 세션방식의 관리를 사용하지 않는다는 설정 => 클라이언트측의 쿠키에 토큰을 저장할 예정
		.authorizeHttpRequests((authorizeRequest) -> authorizeRequest // url별 권한 관리 설정
				.requestMatchers("/login").permitAll() // 누구나 이용 가능한 url
				.requestMatchers("/login").permitAll() // 누구나 이용 가능한 url
				.requestMatchers("/signup").permitAll() // 누구나 이용 가능한 url
				.requestMatchers("/user/login/**").permitAll() // 누구나 이용 가능한 url
				.requestMatchers("/admin/**").hasRole("ADMIN") // /admin으로 시작하는 url은 "ADMIN"권한이 필요
				.requestMatchers("/user/test").hasRole("USER")
				.anyRequest().authenticated()) // 그밖의 요청은 모두 인증이 되어있어야 한다는 설정
		.addFilterBefore(new AuthFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
	// 스프링 시큐리티는 폼기반 로그인에 대한 인증처리이기 때문에 필터들을 실행하기 전에 먼저 jwt을 기반으로 
	// authentication객체를 만들어 주는 코드 추가 ( (뒤의 필터 이전에) 실행할 필터, (그 후에) 실행할 필터)
		
		return http.build();
		
	}
	
	
}
