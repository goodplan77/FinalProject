package com.kh.backend.domain.alarm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.kh.backend.domain.alarm.model.service.AlarmSenderService;
import com.kh.backend.domain.alarm.model.service.AlarmService;
import com.kh.backend.domain.alarm.model.vo.AdminAlarm;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AlarmController {
	
	private final AlarmService alarmService;
	private final AlarmSenderService alarmSenderService;
	
	@GetMapping("/alarm/subscribe")
    public SseEmitter subscribe(@RequestHeader(value = "Last-Event-ID", required = false) String lastEventId) {
        SseEmitter emitter = alarmSenderService.createEmitter();

        if (lastEventId != null) {
            long lastId = Long.parseLong(lastEventId);
            alarmSenderService.sendMissedAlarms(emitter, lastId);
        }

        log.debug("SSE 연결 확인");
        return emitter;
    }
	
	@GetMapping("/alarm/unReadList")
    public ResponseEntity<Map<String,Object>> unReadList() {
    	Map<String,Object> response = new HashMap<>();
        List<AdminAlarm> list = alarmService.unReadList();
        if(list != null && !list.isEmpty()) {
        	response.put("list", list);
        	return ResponseEntity.ok().body(response);
        } else if (list.isEmpty()){
        	response.put("msg", "알림이 비어있습니다.");
        	return ResponseEntity.ok().body(response);
        } else {
        	response.put("msg", "알람 목록을 불러오는데 실패 했습니다.");
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

}
