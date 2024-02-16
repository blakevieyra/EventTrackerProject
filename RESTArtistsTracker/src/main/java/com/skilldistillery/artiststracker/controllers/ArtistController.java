package com.skilldistillery.artiststracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.artiststracker.entities.Artist;
import com.skilldistillery.artiststracker.services.ArtistService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("api")
@RestController
public class ArtistController {

	@Autowired
	private ArtistService artistService;

	@GetMapping("artists")
	public List<Artist> index() {
		return artistService.index();
	}

	@GetMapping(path = "artists/{id}")
	public Artist showArtistById(@PathVariable("id") Integer id, HttpServletResponse req) {
		Artist artist = artistService.findArtistById(id);
		if (artist == null) {
			req.setStatus(404);
		}
		return artist;
	}
	
//	@GetMapping(path = "artists/{name}")
//	public List<Artist> showArtistByName(@PathVariable("name") String name, HttpServletResponse req) {
//		List<Artist> artists = artistService.getArtistByName(name);
//		if (artists == null) {
//			req.setStatus(404);
//		}
//		return artists;
//	}
//	
//	@GetMapping(path = "artists/{song}")
//	public List<Artist> showArtistBySong(@PathVariable("song") String song, HttpServletResponse req) {
//		List<Artist> artists = artistService.getArtistBySong(song);
//		if (artists == null) {
//			req.setStatus(404);
//		}
//		return artists;
//	}

	@PostMapping(path = "artists")
	public Artist createPost(@RequestBody Artist artist, HttpServletResponse res, HttpServletRequest req) {
		artist = artistService.createArtist(artist);
		try {
			if (artist != null) {
				res.setStatus(201);
				res.setHeader("header", req.getRequestURL().append("/").append(artist.getId()).toString());
			}
		} catch (Exception e) {
			res.setStatus(400);
			artist = null;
			e.printStackTrace();
		}
		return artist;
	}

	// put means replacing entity with a new json representation
	@PutMapping(path = "artists/{id}")
	public Artist updateArtist(@PathVariable("id") Integer id, @RequestBody Artist artist, HttpServletResponse res,
			HttpServletRequest req) {
		try {
			artist = artistService.updateArtist(id, artist);
			if (artist == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			artist = null;
			e.printStackTrace();
		}

		return artist;
	}

	@DeleteMapping(path = "artists/{id}")
	public void deletePost(@PathVariable("id") Integer id, HttpServletResponse req) {
		try {
			if (artistService.deleteArtist(id)) {
				req.setStatus(204);
			} else {
				req.setStatus(404);
			}
		} catch (Exception e) {
			req.setStatus(400);
			e.printStackTrace();
		}
	}

	@GetMapping(path = "artists/search/{keyword}{keyword2}")
	public List<Artist> show(@PathVariable("keyword") String keyword, @PathVariable("keyword2") String keyword2,  HttpServletResponse req) {
		List<Artist> posts = artistService.keywordSearch(keyword, keyword2);
		return posts;
	}

}
