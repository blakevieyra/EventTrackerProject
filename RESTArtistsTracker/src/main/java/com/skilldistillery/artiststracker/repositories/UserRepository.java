package com.skilldistillery.artiststracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.artiststracker.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsername(String username);

}
