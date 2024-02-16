package com.skilldistillery.artiststracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.artiststracker.entities.Song;
import com.skilldistillery.artiststracker.services.SongService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("api")
@RestController
public class SongController {
	
	@Autowired
	private SongService songService;

	@GetMapping("artists/{artistId}/songs")
	public List<Song> allSongs(@PathVariable("artistId") Integer artistId, HttpServletResponse res) {
		List<Song> songs = songService.getSongsFromArtist(artistId);
		if (songs == null) {
			res.setStatus(404);
		}
		return songs;
	}
	
	@GetMapping("artists/{artistId}/songs/{songId}")
	public Song findSong(@PathVariable("artistId") Integer artistId, @PathVariable("songId") Integer songId, HttpServletResponse res) {
		Song song = songService.findSong(artistId, songId);
		if (song == null) {
			res.setStatus(404);
		}
		return song;
	}

	@PostMapping("artists/{artistId}/songs")
	public Song addSong(@PathVariable("artistId") Integer artistId, @RequestBody Song song,
			HttpServletRequest req, HttpServletResponse res) {
		try {
			song = songService.createSong(artistId, song);
			if (song == null) {
				res.setStatus(404);
			} else {
				res.setStatus(201);
				res.setHeader("Location", req.getRequestURL().append("/").append(song.getId()).toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			song = null;
		}
		return song;
	}

	@DeleteMapping("artists/{artistId}/songs/{songId}")
	public void deleteSong(
			@PathVariable("artistId") Integer artistId,
			@PathVariable("songId") Integer songId,
			HttpServletResponse res
	) {
		if (songService.deleteSong(artistId, songId)) {
			res.setStatus(204);
		}
		else {
			res.setStatus(404);
		}
	}

}
