package com.kh.backend.signup;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class EmailController {
	
	private final JavaMailSenderImpl mailSender;

	@CrossOrigin(origins = {"http://localhost:3013"})
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
		
		// 이메일 발송 메서드
		sendCode(email, title, content);
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("code", verificationCode);
		
		return ResponseEntity.ok(map);
	}
	
	// 이메일 발송 메서드
	void sendCode(String email, String title, String content) {
		
		MimeMessage mime = mailSender.createMimeMessage();
		
		try {
			MimeMessageHelper helper = new MimeMessageHelper(mime, true);
			
			helper.setTo(email);
			helper.setSubject(title);
			helper.setText(content);
			
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
		mailSender.send(mime);
	}
	
	
	
}
