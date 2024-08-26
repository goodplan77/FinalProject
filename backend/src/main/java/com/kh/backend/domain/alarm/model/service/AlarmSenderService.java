package com.kh.backend.domain.alarm.model.service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.kh.backend.domain.alarm.model.vo.AdminAlarm;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AlarmSenderService {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final List<String> eventCache = new CopyOnWriteArrayList<>();

    public SseEmitter createEmitter() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> handleEmitterTimeout(emitter));
        emitter.onError(e -> handleEmitterError(emitter, e));

        return emitter;
    }

    public void sendAlarm(String message) {
        String eventId = String.valueOf(eventCache.size() + 1);
        eventCache.add(eventId + ":" + message);

        log.debug("알림 보내기 최종: {}", message);
        List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();
        emitters.forEach(emitter -> {
            try {
                log.debug("알림 보내기");
                emitter.send(SseEmitter.event()
                        .id(eventId)
                        .name("alarm")
                        .data(message)
                );
            } catch (IOException e) {
                log.error("알림 전송 중 오류 발생: {}", e.getMessage());
                deadEmitters.add(emitter);
            }
        });
        emitters.removeAll(deadEmitters);
    }

    public void sendMissedAlarms(SseEmitter emitter, long lastId) {
        for (String cachedEvent : eventCache) {
            String[] parts = cachedEvent.split(":", 2);
            long eventId = Long.parseLong(parts[0]);
            if (eventId > lastId) {
                try {
                    emitter.send(SseEmitter.event()
                            .id(String.valueOf(eventId))
                            .name("alarm")
                            .data(parts[1])
                    );
                } catch (IOException e) {
                    handleEmitterError(emitter, e);
                    break;
                }
            }
        }
    }

    private void handleEmitterTimeout(SseEmitter emitter) {
        emitters.remove(emitter);
        log.info("Emitter timed out: {}", emitter);
    }

    private void handleEmitterError(SseEmitter emitter, Throwable e) {
        try {
            emitter.completeWithError(e);
        } catch (Exception ex) {
            log.error("Failed to complete emitter with error: {}", ex.getMessage());
        }
        emitters.remove(emitter);
        log.error("Error on emitter: {}, original error: {}", emitter, e.getMessage());
    }

    public void sendUnreadAlarms(List<AdminAlarm> alarms) {
        if (alarms != null && !alarms.isEmpty()) {
            String eventId = String.valueOf(eventCache.size() + 1);
            eventCache.add(eventId + ":unReadAlarms");

            List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();
            emitters.forEach(emitter -> {
                try {
                    log.debug("읽지 않은 알림 보내기");
                    emitter.send(SseEmitter.event()
                            .id(eventId)
                            .name("unReadAlarms")
                            .data(alarms)
                    );
                } catch (IOException e) {
                    log.error("읽지 않은 알림 전송 중 오류 발생: {}", e.getMessage());
                    deadEmitters.add(emitter);
                }
            });
            emitters.removeAll(deadEmitters);
        }
    }
}
