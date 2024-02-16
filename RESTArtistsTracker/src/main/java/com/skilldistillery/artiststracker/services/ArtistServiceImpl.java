package com.skilldistillery.artiststracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.artiststracker.entities.Artist;
import com.skilldistillery.artiststracker.repositories.ArtistRepository;

@Service
public class ArtistServiceImpl implements ArtistService {
	
	@Autowired
	private ArtistRepository artistRepo;

	@Override
	public Artist findArtistById(int id) {
		return artistRepo.findById(id);
	}

	@Override
	public List<Artist> index() {
		return artistRepo.findAll();
	}

	@Override
	public List<Artist> getArtistByName(String name) {
		return artistRepo.findByName(name);
	}

	@Override
	public List<Artist> getArtistBySong(String name) {
		return artistRepo.findBySong(name);
	}

	@Override
	public List<Artist> keywordSearch(String keyword, String keyword2) {
		return artistRepo.findByNameLikeOrSongLike(keyword, keyword2);
	}

	@Override
	public Artist createArtist(Artist artist) {
		return artistRepo.saveAndFlush(artist);
	}
	
	@Override
	public boolean deleteArtist(int id) {
		boolean deleted = false;
		if (artistRepo.existsById(id)) {
			artistRepo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public Artist updateArtist(int id, Artist artist) {
		Artist foundArtist = findArtistById(id);
		if (foundArtist != null) {
			foundArtist.setName(artist.getName());
			foundArtist.setSong(artist.getSong());
			return artistRepo.saveAndFlush(artist);
		}		
		return artist;
	}
}
