package com.skilldistillery.artiststracker.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin({ "*", "http://localhost/" })
@RequestMapping("api")
@RestController
public class ArtistController {

	@Autowired
	private ArtistService artistService;

	@GetMapping("artists")
	public Set<Artist> index(Principal principal, HttpServletResponse res, HttpServletRequest req) {
		return artistService.index(principal.getName());
	}

	@GetMapping(path = "artists/{id}")
	public Artist showArtistById(Principal principal, @PathVariable("id") Integer id, HttpServletResponse res) {
		Artist artist = artistService.findArtistById(principal.getName(), id);
		try {
			if (artist == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
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
	public Artist createPost(Principal principal,@RequestBody Artist artist, HttpServletResponse res, HttpServletRequest req) {
		artist = artistService.create(principal.getName(), artist);
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
	public Artist updateArtist(Principal principal, @PathVariable("id") Integer id, @RequestBody Artist artist, HttpServletResponse res,
			HttpServletRequest req) {
		try {
			artist = artistService.update(principal.getName(), id, artist);
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
	public void deletePost(Principal principal, @PathVariable("id") Integer id, HttpServletResponse res) {
		artistService.destroy(principal.getName(), id);
		try {
			if (artistService.findArtistById(principal.getName(), id) == null) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
	}

	@GetMapping(path = "artists/search/{keyword}")
	public List<Artist> show(Principal principal, @PathVariable("keyword") String keyword, HttpServletResponse res) {
		List<Artist> posts = null;
		try {
			posts = artistService.keywordSearch(principal.getName(), keyword);
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();

		}
		return posts;
	}

}
