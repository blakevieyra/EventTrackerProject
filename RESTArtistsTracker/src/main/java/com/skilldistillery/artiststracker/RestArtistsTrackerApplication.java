package com.skilldistillery.artiststracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class RestArtistsTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestArtistsTrackerApplication.class, args);
	}
	
	@Bean
	protected PasswordEncoder configurePasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	

}
