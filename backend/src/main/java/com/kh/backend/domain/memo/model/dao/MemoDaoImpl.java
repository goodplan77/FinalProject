package com.kh.backend.domain.memo.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.backend.domain.user.model.vo.Memo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MemoDaoImpl implements MemoDao{

	private final SqlSessionTemplate session;

	@Override
	public List<Memo> selectMemo(int userNo) {
		return session.selectList("memo.selectMemo",userNo);
	}

	@Override
	public int insertMemo(Memo memo) {
		return session.insert("memo.insertMemo", memo);
	}

	@Override
	public int delectMemo(int memoNo) {
		return session.delete("memo.deleteMemo", memoNo);
	}


}
