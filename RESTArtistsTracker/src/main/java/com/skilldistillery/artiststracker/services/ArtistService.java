package com.skilldistillery.artiststracker.services;

import java.util.List;

import com.skilldistillery.artiststracker.entities.Artist;

public interface ArtistService {
		
	List<Artist> index();
	
	Artist findArtistById(int id);

	List<Artist> getArtistByName(String name);

//	List<Artist> getArtistBySong(String name);

	List<Artist> keywordSearch(String keyword);
	
	Artist create(Artist artist);
	
	Artist update(int id, Artist artist);
	
	void delete(int id);

	<OkHttpClient> void populateArtist();

}
