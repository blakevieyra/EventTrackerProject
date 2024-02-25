package com.skilldistillery.artiststracker.services;

import java.util.List;

import com.skilldistillery.artiststracker.entities.Artist;
import com.skilldistillery.artiststracker.entities.Song;

public interface SongService {
	
	List<Song> findAllSongs();
	
	Song findSong(int artistId, int songId);
	
	Song createSong(int artistId, Song song);
	
	Song update(int artistId, int songId, Song song) ;

	void deleteSong(int artistId, int songId);
	
	List<Song> getSongsFromArtist(int artistId);
	
	List<Song> keywordSearch(String keyword);

}
