package com.kh.backend.security.config;

import java.time.Duration;
import java.util.function.Function;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ReactorResourceFactory;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import reactor.netty.http.client.HttpClient;

// webflux안에 있는 패키지를 사용
@Configuration // 설정파일임을 의미
public class WebClientConfig {
	
	// WebClient객체의 성능 향상을 위해 설정
	@Bean
	public ReactorResourceFactory resourceFactory() {
		
		ReactorResourceFactory factory = new ReactorResourceFactory();
		
		factory.setUseGlobalResources(false); // 공유자원 사용설정 false
		
		return factory;
	}
	
	// WebClient : 비동기 방식 http 요청을 지원하는 클래스
	@Bean
	public WebClient webClient() {
		
		Function<HttpClient, HttpClient> mapper = 
				client -> HttpClient
						.create()
						.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000) // 연결 지연시 대기시간 (10초)
						.doOnConnected( connection -> 
								connection
								  .addHandlerLast(new ReadTimeoutHandler(10)) // 연결된 후 커넥션 객체의 읽기 제한시간 10초
								  .addHandlerLast(new WriteTimeoutHandler(10)) // 연결된 후 커넥션 객체의 쓰기 제한시간 10초						  
						)
						.responseTimeout(Duration.ofSeconds(1)); // 응답시간 1초 제한
		
		return WebClient
				.builder()
				.clientConnector(
						new ReactorClientHttpConnector(resourceFactory(), mapper)
				)
				.build();
		
	}
	
	
}

