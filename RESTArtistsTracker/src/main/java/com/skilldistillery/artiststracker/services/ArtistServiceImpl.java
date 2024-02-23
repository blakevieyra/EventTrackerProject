package com.skilldistillery.artiststracker.services;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.artiststracker.entities.Artist;
import com.skilldistillery.artiststracker.repositories.ArtistRepository;

import jakarta.security.auth.message.callback.PrivateKeyCallback.Request;

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

	@Override
	public <OkHttpClient> void populateArtist() {
//		OkHttpClient client = new OkHttpClient();
//
//		Request request = new Request.Builder()
//			.url("https://deezerdevs-deezer.p.rapidapi.com/infos")
//			.get()
//			.addHeader("X-RapidAPI-Key", "c85e2ae41bmshc5dcb4c9dfbd0f3p15e336jsnc09d9a0c8b64")
//			.addHeader("X-RapidAPI-Host", "deezerdevs-deezer.p.rapidapi.com")
//			.build();
//
//		Response response = client.newCall(request).execute();	
	}
}
