package com.kh.backend.domain.ask.model.dao;

import java.util.List;

import com.kh.backend.domain.ask.model.vo.Ask;

public interface AskDao {

	int insertAsk(Ask ask);

	List<Ask> selectAskList();

	int updateAsk(Ask ask);

}
