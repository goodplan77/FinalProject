package com.kh.backend.domain.user.model.service;

import java.util.List;

import com.kh.backend.domain.user.model.vo.User;

public interface AdminUserService {

	List<User> selectUsers();

}
