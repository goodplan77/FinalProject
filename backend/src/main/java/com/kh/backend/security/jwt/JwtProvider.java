package com.kh.backend.security.jwt;

import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

//@RequiredArgsConstructor
//@Component
//public class JwtProvider {
//	
//	private final UserDetailsServiceImpl service;
//
//	// application.properties에 jwt.secret이라는 name의 키의 value값을 꺼내서 대입해 줌
//	@Value("${jwt.secret}")
//	private String secretKey;
//	
//	@PostConstruct
//	public void init() {
//		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
//	}
//	
//	// 현재 애플리케이션 자체 토큰 생성
//	public String createToken(String userPk) {
//		
//		Claims claims = Jwts.claims().setSubject(userPk);
//		Date now = new Date();
//		
//		return Jwts.builder()
//			.setClaims(claims)
//			.setIssuedAt(now) // 토큰 발행 시간
//			.setExpiration( new Date( now.getTime() + (30*60*1000) )) // 만료 시간 (30분)
//			.signWith(SignatureAlgorithm.HS256, secretKey)
//			.compact();
//	}
//
//	public String resolveToken(HttpServletRequest request) {
//		String accessToken = request.getHeader("Authorization");
//		return accessToken;
//	}
//
//	public boolean validationToken(String token) {
//		
//		try {
//			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
//			
//			return !claims.getBody().getExpiration().before(new Date());
//			
//		}catch(Exception e) {
//			return false;
//		}
//		
//	}
//
//	/*	Authentication : 사용자 인증 정보가 담겨있는 객체
//	 * - Principal : 인증된 사용자 정보
//	 * - Credentials : 인증에 필요한 비밀번호를 저장하는 객체
//	 *				(내부적으로 인증작업시 필요하며 보호되고 있음.)
//	 * - Authorities : 인증된 사용자가 가진 권한 목록
//	 */
//	public Authentication getAuthentication(String token) {
//		
//		User user = (User) service.loadUserByUsername(getUserPk(token));
//		
//		return new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
//		
//	}
//	
//	// 토큰에서 userPk값을 꺼내는 메서드
//	public String getUserPk(String token) {
//		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
//	}
//	
//	
//}







