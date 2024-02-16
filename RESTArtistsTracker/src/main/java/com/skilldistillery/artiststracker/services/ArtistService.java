package com.skilldistillery.artiststracker.services;

import java.util.List;

import com.skilldistillery.artiststracker.entities.Artist;

public interface ArtistService {
	
	List<Artist> index();
	
	Artist findArtistById(int id);

	List<Artist> getArtistByName(String name);

	List<Artist> getArtistBySong(String name);

	List<Artist> keywordSearch(String keyword, String keyword2);
	
	Artist createArtist(Artist artist);
	
	Artist updateArtist(int id, Artist artist);
	
	boolean deleteArtist(int id);

}
