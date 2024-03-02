package com.skilldistillery.artiststracker.services;

import java.util.List;
import java.util.Set;

import com.skilldistillery.artiststracker.entities.Artist;

public interface ArtistService {
		
	Set<Artist> index(String username);
	Artist findArtistById(String username, int id);
	List<Artist> getArtistByName(String username, String name);
	List<Artist> keywordSearch(String username, String keyword);
	Artist create(String username, Artist artist);
	Artist update(String username, int id, Artist artist);
	public boolean destroy(String username, int tid);

}
