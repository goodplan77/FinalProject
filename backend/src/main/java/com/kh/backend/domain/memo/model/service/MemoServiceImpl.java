package com.kh.backend.domain.memo.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kh.backend.domain.board.model.dao.BoardDao;
import com.kh.backend.domain.memo.model.dao.MemoDao;
import com.kh.backend.domain.user.model.vo.Memo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemoServiceImpl implements MemoService{
	
	private final MemoDao memoDao;

	@Override
	public List<Memo> selectMemo() {
		return memoDao.selectMemo();
	}

	@Override
	public int insertMemo(Memo memo) {
		return memoDao.insertMemo(memo);
	}

	@Override
	public int delectMemo(int memoNo) {
		return memoDao.delectMemo(memoNo);
	}
	
	
}
