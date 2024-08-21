package com.kh.backend.domain.memo.model.dao;

import java.util.List;
import java.util.Map;

import com.kh.backend.domain.user.model.vo.Memo;

public interface MemoDao {

	List<Memo> selectMemo();

	int insertMemo(Memo memo);

	int delectMemo(int memoNo);

}
