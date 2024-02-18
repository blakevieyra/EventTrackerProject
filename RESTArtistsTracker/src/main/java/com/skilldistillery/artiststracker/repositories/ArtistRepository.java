package com.skilldistillery.artiststracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.artiststracker.entities.Artist;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
	
	Artist findById(int id);
	
	List<Artist> findAll();
	
	boolean existsById(int id); 
	
	void deleteById(int id);

	List<Artist> findByName(String name);
	
	List<Artist> findByNameLikeOrBandLike(String keyword1, String keyword2);

}
