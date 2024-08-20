package com.kh.backend.domain.ask.model.service;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.ask.model.dao.AskDao;
import com.kh.backend.domain.ask.model.vo.Ask;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AskServiceImpl implements AskService{
	
	private final AskDao askDao;
	
	@Override
	public int insertAsk(Ask ask) {
		return askDao.insertAsk(ask);
	}

}
