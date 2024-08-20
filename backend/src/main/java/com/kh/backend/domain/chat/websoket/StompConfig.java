package com.kh.backend.domain.chat.websoket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@EnableWebSocketMessageBroker // 메세지 브로커 활성화
@Configuration
public class StompConfig implements WebSocketMessageBrokerConfigurer{
	
	@Override // 웹소켓 서버 활성화
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry
			.addEndpoint("/stompServer")
			.setAllowedOrigins("*")
			.withSockJS();
	}

	@Override // 메세지 브로커 설정
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		
		// 브로커 활성화
		// '/chat'으로 시작하는 메세지
//		registry
//			.enableSimpleBroker("/chat")
			
		// 
	}
	
	
	
}
