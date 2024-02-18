package com.skilldistillery.artiststracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class ArtistTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Artist artist;

	
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
		artist = em.find(Artist.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		artist = null;
	}

	@Test
	void test_Artist_Has_Name() {
		assertNotNull(artist);
		assertEquals("Blake Vieyra", artist.getName());
		
	}
	
	
	@Test
	void test_Artist_Has_Image() {
		assertNotNull(artist);
		assertEquals("resources/images/blakevieyra.jpeg", artist.getImage());
	}
	
	@Test
	void test_Artist_Has_Song() {
		assertNotNull(artist);
		assertTrue(artist.getSongs().size() > 0);
		
	}

}
