package com.skilldistillery.artiststracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.artiststracker.entities.Artist;
import com.skilldistillery.artiststracker.entities.Song;

public interface SongRepository extends JpaRepository<Song, Integer> {

	Song findByArtist_IdAndId(int artistId, int songId);
	
	List<Song> findByArtist_Id(int artistId);

	boolean existsByIdAndArtist_Id(int songId, int artistId);
	
	void deleteById(int songId);
	
	List<Song> findByNameLikeOrGenreLikeOrAlbumLike(String keyword1, String keyword2, String keyword3);
}
