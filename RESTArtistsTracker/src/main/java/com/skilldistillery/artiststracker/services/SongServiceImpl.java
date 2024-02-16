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
	public boolean deleteSong(int artistId, int songId) {
		boolean deleted = false;
		if (songRepo.existsByIdAndArtist_Id(artistId, songId)) {
			songRepo.deleteById(songId);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public Song findSong(int artistId, int songId) {
		return songRepo.findByArtist_IdAndId(artistId, songId);
	}
}
