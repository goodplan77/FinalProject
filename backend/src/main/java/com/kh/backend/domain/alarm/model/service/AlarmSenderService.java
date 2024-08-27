package com.kh.backend.domain.alarm.model.service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AlarmSenderService {

    private final List<SseEmitter> adminEmitters = new CopyOnWriteArrayList<>();
    private final List<SseEmitter> userEmitters = new CopyOnWriteArrayList<>();
    private final List<String> eventCache = new CopyOnWriteArrayList<>();

    public SseEmitter createEmitter(boolean isAdmin) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        if (isAdmin) {
            adminEmitters.add(emitter);
        } else {
            userEmitters.add(emitter);
        }

        emitter.onCompletion(() -> removeEmitter(emitter, isAdmin));
        emitter.onTimeout(() -> handleEmitterTimeout(emitter, isAdmin));
        emitter.onError(e -> handleEmitterError(emitter, isAdmin, e));

        return emitter;
    }

    private void removeEmitter(SseEmitter emitter, boolean isAdmin) {
        if (isAdmin) {
            adminEmitters.remove(emitter);
        } else {
            userEmitters.remove(emitter);
        }
    }

    public void sendAlarm(String message, boolean isAdmin) {
        String eventId = String.valueOf(eventCache.size() + 1);
        eventCache.add(eventId + ":" + message);

        log.debug("알림 보내기 최종: {}", message);
        List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();
        List<SseEmitter> targetEmitters = isAdmin ? adminEmitters : userEmitters;

        targetEmitters.forEach(emitter -> {
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
        targetEmitters.removeAll(deadEmitters);
    }

    private void handleEmitterTimeout(SseEmitter emitter, boolean isAdmin) {
        removeEmitter(emitter, isAdmin);
        log.info("Emitter timed out: {}", emitter);
    }

    private void handleEmitterError(SseEmitter emitter, boolean isAdmin, Throwable e) {
        try {
            emitter.completeWithError(e);
        } catch (Exception ex) {
            log.error("Failed to complete emitter with error: {}", ex.getMessage());
        }
        removeEmitter(emitter, isAdmin);
        log.error("Error on emitter: {}, original error: {}", emitter, e.getMessage());
    }
}

