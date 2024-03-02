package com.skilldistillery.artiststracker.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.artiststracker.entities.Artist;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
	
	Set<Artist>findByUsers_Username(String username);
	List<Artist> findByUsers_UsernameAndNameLikeOrBandLike(String username, String keyword1, String keyword2);
	Artist findByUsers_UsernameAndId(String username,int id);
	List<Artist> findByUsers_UsernameAndName(String username, String name);
	boolean existsByUsers_UsernameAndId(String username, int tid);
	//void deleteById(String username, int id);

}
