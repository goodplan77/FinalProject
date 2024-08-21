package com.kh.backend.domain.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.kh.backend.domain.user.model.service.UserService;
import com.kh.backend.domain.user.model.vo.User;
import com.kh.backend.security.jwt.JwtProvider;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
	
	private final JavaMailSenderImpl mailSender;
	private final UserService service;
	private final BCryptPasswordEncoder encoder;
	private final JwtProvider jwtProvider;
	
	// 이메일 중복체크 & 인증코드 발송 메서드
	@PostMapping("/sendEmail")
	public ResponseEntity<HashMap<String, Object>> sendEmail(
			@RequestBody HashMap<String, Object> param
			) {
		
		HashMap<String, Object> resMap = new HashMap<>();
		int result = 0;
		
		// 사용자 email
		String email = (String) param.get("email");
		
		// 이메일 중복확인
		result = service.checkEmail(email);
		
		if(result>0) {
			resMap.put("msg", "이미 가입된 이메일입니다.");
			return ResponseEntity.ok(resMap);
		}
		
		// 이메일 발송 로직
		// 랜덤 코드 6자리 생성
		String verificationCode = String.valueOf( (int)(Math.random()*900000 + 100000) );	
		
		// 메일 내용 생성
		StringBuilder sbContent = new StringBuilder();
		String title = "반주한상 이메일 인증번호 입니다.";
		String content = sbContent.append("반주한상 이메일 인증번호 입니다.\n")
								  .append("인증번호 : ")
								  .append(verificationCode)
								  .append("\n위 인증 번호를 인증번호 확인란에 입력해주세요.")
								  .toString();
		
		// 이메일 발송 메서드
		result = sendCode(email, title, content);
		
		if(result > 0) {
			resMap.put("verificationCode", verificationCode);
			resMap.put("msg", "귀하의 이메일로 인증코드가 발송되었습니다.");
			return ResponseEntity.ok(resMap);
		}else {
			resMap.put("msg", "잘못된 이메일입니다.");
			return ResponseEntity.badRequest().body(resMap);
		}
		
	}
	
	// 이메일 발송 메서드
	int sendCode(String email, String title, String content) {
		
		int result = 0;
		MimeMessage mime = mailSender.createMimeMessage();
		
		try {
			MimeMessageHelper helper = new MimeMessageHelper(mime, true);
			
			helper.setTo(email);
			helper.setSubject(title);
			helper.setText(content);
			
			result = 1;
			
			mailSender.send(mime);
			
			return result;
			
		} catch (MessagingException e) {
			return result;
		}
	}
	
	// 닉네임 중복 확인 메서드
	@GetMapping("/checkNickName")
	public String checkNickName(
			@RequestParam HashMap<String, String> param
			) {

		String nickName = param.get("nickName");
		
		int result = service.checkNickName(nickName);
		
		if(result>0) {
			return "이미 사용중인 닉네임입니다.";
		}else {
			return "사용 가능한 닉네임입니다.";
		}
	}
	
	// 회원가입 메서드
	@PostMapping("/insertUser")
	public ResponseEntity<HashMap<String, Object>> insertUser(
			@RequestBody User user
			){
		HashMap<String, Object> resMap = new HashMap<>();
		
		// 비밀번호 암호화
		String encodedPwd = encoder.encode(user.getPwd());
		user.setPwd(encodedPwd);
		
		// 포인트 500
		user.setPoints(500);
		
		int result = service.insertUser(user);
		
		// 회원가입 성공시 jwt토큰 발행
		if(result>0) {
			resMap = loginResponse(user);
			resMap.put("msg", "회원가입을 축하합니다. 포인트 500지급됨!");
			return ResponseEntity.ok(resMap);
		}else {
			resMap.put("msg", "실패");
			return ResponseEntity.badRequest().body(resMap);
		}
		
	}
	
	// 로그인 메서드
	@PostMapping("/login/{socialType}")
	public ResponseEntity<HashMap<String, Object>> authCheck(
			@PathVariable String socialType,
			@RequestBody HashMap<String, Object> param
			){
		
		User user = new User();
		HashMap<String, Object> resMap = new HashMap<>();
		
		// 소셜 로그인 메서드
		if(!socialType.equals("none")) {
			String accessToken = (String) param.get("accessToken");
			
			HashMap<String, Object> map = new HashMap<>();
			map.put("accessToken", accessToken);
			map.put("socialType", socialType);
			
			user = service.loginSocial(map);
			
			if(user != null) {
				resMap = loginResponse(user);
				resMap.put("msg", socialType + "로 로그인 성공");
				return ResponseEntity.ok(resMap);
			}else {
				resMap.put("msg", "예기치 못한 에러 발생");
				return ResponseEntity.badRequest().body(resMap);
			}
			
		// 일반 로그인 메서드
		}else {
			user = service.selectUser(param);

			if(user == null) {
				resMap.put("msg", "존재하지 않는 회원입니다.");
				return ResponseEntity.badRequest().body(resMap);
			}else if(user != null && !encoder.matches((CharSequence) param.get("pwd"), user.getPwd())) {
				resMap.put("msg", "비밀번호가 다릅니다.");
				return ResponseEntity.badRequest().body(resMap);
			}else if(user != null && encoder.matches((CharSequence) param.get("pwd"), user.getPwd())) {
				resMap = loginResponse(user);
				resMap.put("msg", "환영합니다!");
				return ResponseEntity.ok(resMap);
			}
			
		}
		
		resMap.put("msg", "몰라 에러남");
		return ResponseEntity.badRequest().body(resMap);
	}
	
	// 로그인 세부 메서드
	HashMap<String, Object> loginResponse(User user){
		
		int userNo = user.getUserNo();
		
		String jwtToken = jwtProvider.createToken(userNo);
		
		HashMap<String, Object> resMap = new HashMap<>();
		
		resMap.put("jwtToken", jwtToken);
		resMap.put("user", user);
		
		System.err.println(user);
		
		return resMap;
	}
	
	// 회원 정보 수정 메서드
	@PatchMapping("/updateUser")
	public int updateUser(
			@RequestBody HashMap<String, Object> param
			) {
		int result = 0;

		System.err.println(param);
		
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 필터 테스트용 메서드
	@PostMapping("/test")
	public ResponseEntity<HashMap<String, Object>> test() {
		String result = "성공함?";
		HashMap<String, Object> map = new HashMap<>();
		map.put("msg", result);
		log.info("{}" , map);
		return ResponseEntity.ok(map);
	}
	
	
}
