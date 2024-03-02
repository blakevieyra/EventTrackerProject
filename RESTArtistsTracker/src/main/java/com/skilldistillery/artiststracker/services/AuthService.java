package com.skilldistillery.artiststracker.services;

import com.skilldistillery.artiststracker.entities.User;

public interface AuthService {
	
	public User register(User user);
	public User getUserByUsername(String user);
	
}
