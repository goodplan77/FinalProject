package com.kh.backend.domain.ask.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.ask.model.vo.Ask;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class AskDaoImpl implements AskDao{

	private final SqlSessionTemplate session;

	@Override
	public int insertAsk(Ask ask) {
		return session.insert("ask.insertAsk", ask);
	}

	// 관리자용
	@Override
	public List<Ask> selectAskList() {
		return session.selectList("ask.selectAskList");
	}

	@Override
	public int updateAsk(Ask ask) {
		return session.update("ask.updateAsk", ask);
	}
	
	
}
