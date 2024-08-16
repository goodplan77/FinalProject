package com.kh.backend.domain.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
@CrossOrigin(origins = {"http://localhost:3013"})
public class UserController {
	
	private final JavaMailSenderImpl mailSender;
	private final UserService service;
	private final BCryptPasswordEncoder encoder;
	private final JwtProvider jwtProvider;

	@PostMapping("/sendEmail")
	public ResponseEntity<HashMap<String, Object>> sendEmail(
			@RequestBody HashMap<String, String> param
			) {
		
		// 사용자 email
		String email = param.get("email");
		
		// 랜덤 코드 6자리 생성
		String verificationCode = String.valueOf( (int)(Math.random()*999999 + 1) );		
		
		// 메일 내용 생성
		StringBuilder sbContent = new StringBuilder();
		
		String title = "반주한상 이메일 인증번호 입니다.";
		
		String content = sbContent.append("반주한상 이메일 인증번호 입니다.\n")
								  .append("인증번호 : ")
								  .append(verificationCode)
								  .append("\n위 인증 번호를 인증번호 확인란에 입력해주세요.")
								  .toString();
		
		HashMap<String, Object> map = new HashMap<>();
		
		// 이메일 발송 메서드
		int result = sendCode(email, title, content);
		
		if(result > 0) {
			map.put("verificationCode", verificationCode);
			
			return ResponseEntity.ok(map);
		}else {
			
			return ResponseEntity.badRequest().build();
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
			//e.printStackTrace();
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
		
		if(result>1) {
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
		
		// 비밀번호 암호화
		String encodedPwd = encoder.encode(user.getPwd());
		user.setPwd(encodedPwd);
		
		// 포인트 500
		user.setPoints(500);
		
		int result = service.insertUser(user);
		
		System.err.println(user);
		return null;
	}
	
	// 소셜로그인 메서드
	@PostMapping("/login/{socialType}")
	public ResponseEntity<HashMap<String, Object>> authCheck(
			@PathVariable String socialType,
			@RequestBody HashMap<String, String> param
			){
		
		String accessToken = param.get("accessToken");
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("accessToken", accessToken);
		map.put("socialType", socialType);
		
		User user = service.loginSocial(map);
		
		String ACCESS_TOKEN = jwtProvider.createToken(user.getUserNo());
		
		HashMap<String, Object> resMap = new HashMap<>();
		resMap.put("jwtToken", ACCESS_TOKEN);
		resMap.put("user", user);
		
		return ResponseEntity.ok(resMap);
	}
	
	
	
}
