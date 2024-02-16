package com.skilldistillery.artiststracker.services;

import java.util.List;

import com.skilldistillery.artiststracker.entities.Song;

public interface SongService {
	
	Song findSong(int artistId, int songId);
	
	Song createSong(int artistId, Song song);

	boolean deleteSong(int artistId, int songId);
	
	List<Song> getSongsFromArtist(int artistId);

}
