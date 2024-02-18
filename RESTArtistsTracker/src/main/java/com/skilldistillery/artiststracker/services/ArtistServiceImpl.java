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

//	@Override
//	public List<Artist> getArtistBySong(String name) {
//		return artistRepo.findBySongs(name);
//	}

	@Override
	public List<Artist> keywordSearch(String keyword) {
		keyword = "%" + keyword + "%";
		return artistRepo.findByNameLikeOrBandLike(keyword, keyword);
	}

	@Override
	public Artist create(Artist artist) {
		return artistRepo.saveAndFlush(artist);
	}

	@Override
	public void delete(int id) {
		if (artistRepo.existsById(id)) {
			artistRepo.deleteById(id);
		}
	}

	@Override
	public Artist update(int id, Artist artist) {
		Artist foundArtist = findArtistById(id);
		if (foundArtist != null) {
			foundArtist.setName(artist.getName());
			return artistRepo.saveAndFlush(foundArtist);
		}
		return foundArtist;
	}
}
