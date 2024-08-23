package com.kh.backend.domain.ask.model.service;

import java.util.List;

import com.kh.backend.domain.ask.model.vo.Ask;

public interface AskService {

	int insertAsk(Ask ask);

	List<Ask> selectAskList();

	int updateAsk(Ask ask);

}
