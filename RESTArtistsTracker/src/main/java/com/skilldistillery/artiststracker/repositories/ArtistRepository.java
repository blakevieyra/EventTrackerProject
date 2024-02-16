package com.skilldistillery.artiststracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.artiststracker.entities.Artist;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
	
	Artist findById(int id);
	
	List<Artist> findAll();
	
	boolean existsById(int id); 
	
	boolean	deleteById(int id);

	List<Artist> findByName(String name);
	
	List<Artist> findBySong(String song);

	List<Artist> findByNameLikeOrSongLike(String keyword, String keyword2);

}
