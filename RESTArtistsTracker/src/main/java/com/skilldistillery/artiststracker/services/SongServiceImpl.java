package com.skilldistillery.artiststracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.artiststracker.entities.Artist;
import com.skilldistillery.artiststracker.entities.Song;
import com.skilldistillery.artiststracker.repositories.ArtistRepository;
import com.skilldistillery.artiststracker.repositories.SongRepository;

@Service
public class SongServiceImpl implements SongService {

	@Autowired
	private SongRepository songRepo;

	@Autowired
	private ArtistRepository artistRepo;

	@Override
	public List<Song> getSongsFromArtist(int artistId) {
		if (!artistRepo.existsById(artistId)) {
			return null;
		}
		List<Song> songs = songRepo.findByArtist_Id(artistId);
		return songs;
	}

	@Override
	public Song createSong(int artistId, Song song) {
		Optional<Artist> opt = Optional.of(artistRepo.findById(artistId));
		if (opt.isPresent()) {
			song.setArtist(opt.get());
			return songRepo.saveAndFlush(song);
		}
		return null;
	}
	
	@Override
	public Song update(int artistId, int songId, Song song) {
		Song foundSong = songRepo.findByArtist_IdAndId(artistId, songId);
		if (foundSong != null) {
			foundSong.setName(song.getName());
			foundSong.setLength(song.getLength());
			foundSong.setArtist(song.getArtist());
			foundSong.setGenre(song.getGenre());
			foundSong.setAlbum(song.getAlbum());
			return songRepo.saveAndFlush(foundSong);
		}
		return foundSong;
	}

	@Override
	public void deleteSong(int artistId, int songId) {
			if (songRepo.existsByIdAndArtist_Id(songId, artistId)) {
				songRepo.deleteById(songId);
			}
		}

	@Override
	public Song findSong(int artistId, int songId) {
		return songRepo.findByArtist_IdAndId(artistId, songId);
	}

	@Override
	public List<Song> keywordSearch(String keyword) {
		keyword = "%" + keyword + "%";
		return songRepo.findByNameLikeOrGenreLikeOrAlbumLike(keyword, keyword, keyword);
	}

	@Override
	public List<Song> findAllSongs() {
		return songRepo.findAll();
	}
}
