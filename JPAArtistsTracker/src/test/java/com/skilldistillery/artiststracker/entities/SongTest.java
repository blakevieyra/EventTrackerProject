package com.skilldistillery.artiststracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class SongTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Song song;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAArtistsTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		song = em.find(Song.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		song = null;
	}

	@Test
	void test_Song_Has_Name() {
		assertNotNull(song);
		assertEquals("test", song.getName());
	}

	@Test
	void test_Song_Has_Artist() {
		assertNotNull(song);
		assertEquals("Blake Vieyra", song.getArtist().getName());
	}

	@Test
	void test_Song_Has_Album() {
		assertNotNull(song);
		assertEquals("test", song.getAlbum());
	}

	@Test
	void test_Song_Has_Genre() {
		assertNotNull(song);
		assertEquals("rock", song.getGenre());
	}

}
