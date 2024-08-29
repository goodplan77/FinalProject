package com.kh.backend.domain.user.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.backend.domain.board.model.vo.Board;
import com.kh.backend.domain.user.model.service.AdminUserService;
import com.kh.backend.domain.user.model.service.UserService;
import com.kh.backend.domain.user.model.vo.User;
import com.kh.backend.security.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/user")
@CrossOrigin(origins = { "http://localhost:3014" })
public class AdminUserController {

	private final AdminUserService userService;
	private final UserService service;
	private final BCryptPasswordEncoder encoder;
	private final JwtProvider jwtProvider;

	@GetMapping("/UserList")
	public List<User> userBoardList() {
		List<User> list = userService.selectUsers();
		return list;
	}

	@GetMapping("/UserDetail/{userNo}")
	public ResponseEntity<Map<String, Object>> userBoardList(@PathVariable int userNo) {
		Map<String, Object> response = new HashMap<>();
		try {
			User user = userService.selectUserOne(userNo);
			if (user != null) {
				response.put("user", user);
				return ResponseEntity.ok(response);
			} else {
				response.put("msg", "데이터 처리중 문제가 발생했습니다.");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.put("msg", "에러가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}

	}

	// 관리자 로그인
	@PostMapping("/login")
	public ResponseEntity<HashMap<String, Object>> authCheck(@RequestBody HashMap<String, Object> param) {

		User admin = new User();
		HashMap<String, Object> resMap = new HashMap<>();

		admin = service.selectUser(param);

		if (admin == null) {
			resMap.put("msg", "존재하지 않는 관리자 회원입니다.");
			return ResponseEntity.badRequest().body(resMap);
		} else if (admin != null && !encoder.matches((CharSequence) param.get("pwd"), admin.getPwd())) {
			resMap.put("msg", "비밀번호가 다릅니다.");
			return ResponseEntity.badRequest().body(resMap);
		} else if (admin != null && encoder.matches((CharSequence) param.get("pwd"), admin.getPwd())
				&& !((admin.getUserNo()) >= 0 && (admin.getUserNo()) <= 9)) {
			resMap.put("msg", "권한이 없습니다.");
			return ResponseEntity.badRequest().body(resMap);
		} else if (admin != null && encoder.matches((CharSequence) param.get("pwd"), admin.getPwd())
				&& ((admin.getUserNo()) >= 0 && (admin.getUserNo()) <= 9)) {
			resMap = loginResponse(admin);
			resMap.put("msg", admin.getNickName() + "님 , 환영합니다!");
			return ResponseEntity.ok(resMap);
		}

		resMap.put("msg", "몰라 에러남");
		return ResponseEntity.badRequest().body(resMap);
	}

	// 로그인 세부 메서드
	HashMap<String, Object> loginResponse(User admin) {

		int userNo = admin.getUserNo();
		String jwtToken = jwtProvider.createToken(userNo);
		HashMap<String, Object> resMap = new HashMap<>();

		resMap.put("jwtToken", jwtToken);
		resMap.put("admin", admin);

		return resMap;
	}
	
	@PostMapping("/updateuser")
	public ResponseEntity<Map<String, Object>> updateuserAdmin(@RequestBody User user) {
		Map<String, Object> response = new HashMap<>();
		try {
			int result = userService.updateUser(user);
			if (result > 0) {
				response.put("msg", "회원 정보 수정 작업이 완료 되었습니다.");
				return ResponseEntity.ok(response);
			} else {
	        	throw new NullPointerException();
	        }
		} catch (NullPointerException e) {
	    	e.printStackTrace();
	    	response.put("msg", "회원 정보 수정 작업이 완료 되었습니다.");
	    	return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        e.printStackTrace();
	        // 서버 오류가 발생한 경우 500 상태 반환
	        response.put("msg", "서버 오류가 발생했습니다.");
	        return ResponseEntity.internalServerError().body(response);
	    }

	}
	

}
