window.addEventListener("load", function(e) {
	init();
});

function init() {
	var audioSources = ['music/06 Ramble On.m4a',
		'music/01 Hells Bells.m4a',
		'music/02 Meant to Live.m4a',
		'music/13 Titanium (feat. Sia).m4a',
		'music/1-06 Wish You Were Here.m4a',
		'music/05 Shes Everything.m4a',
		'music/04 Electric Feel.m4a',
		'music/02 No One Like You.m4a',
		'music/03 If You Could Only See.m4a',
		'music/01 The A Team.m4a',
		'music/02 Dont Take the Girl.m4a',
		'music/02 Carrying Your Love With Me.m4a'];
	var index = 0;

	var audio = document.createElement('audio');
	audio.src = audioSources[index];
	audio.controls = true;
	audio.volume = 0.3;

	document.body.appendChild(audio);

	document.getElementById('playButton').addEventListener('click', function() {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
			index = (index + 1) % audioSources.length;
			audio.src = audioSources[index];
			audio.play();
		}
	});
	document.addingArtistForm.addArtistbtn.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('adding artists');
		let artist = {
			name: addingArtistForm.name.value,
			band: addingArtistForm.band.value,
			image: addingArtistForm.image.value,
		};
		addArtist(artist);
	});
	document.updateArtistForm.updateArtistbtn.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('update artists');
		let artistId = document.updateArtistForm.artistId.value;
		let updatedArtist = {
			id: document.updateArtistForm.artistId.value,
			name: document.updateArtistForm.name.value,
			band: document.updateArtistForm.band.value,
			image: document.updateArtistForm.image.value,
		};
		updateArtist(artistId, updatedArtist);
	});
	document.getElementById('keywordBtn').addEventListener('click', function(e) {
		e.preventDefault();
		console.log('searching artists');
		let keyword = document.getElementById('keyword').value;
		console.log(keyword);
		getArtistByKeyword(keyword);
	});
	document.getElementById('keywordSongBtn').addEventListener('click', function(e) {
		e.preventDefault();
		console.log('searching songs');
		let keyword = document.getElementById('keywordSong').value;
		console.log(keyword);
		getSongsByKeyword(keyword);
	});
	document.getElementById('artistBtn').addEventListener('click', function(e) {
		e.preventDefault();
		console.log('searching for artist');
		let artistId = document.getElementById('id').value;
		console.log(artistId);
		getArtistById(artistId);
	});
	document.getElementById('getAllArtistsBtn').addEventListener('click', function(e) {
		e.preventDefault();
		console.log('geting all artists');
		let tbody = document.getElementById('songTable');
		tbody.textContent = '';
		loadAllArtists();
	});
	document.addingSongForm.addSongbtn.addEventListener('click', function(e) {
		e.preventDefault();
		let artistId = document.addingSongForm.artistId.value;
		let song = {
			artistId: addingSongForm.artistId.value,
			name: addingSongForm.name.value,
			genre: addingSongForm.genre.value,
			album: addingSongForm.album.value,
			length: addingSongForm.length.value,
		};
		console.log('adding songs' + artistId);
		addSong(artistId, song);

	});
	document.updateSongForm.updateSongbtn.addEventListener('click', function(e) {
		e.preventDefault();
		let artistId = document.updateSongForm.artistId.value;
		let songId = document.updateSongForm.songId.value;
		let updatedSong = {
			name: document.updateSongForm.songName.value,
			genre: document.updateSongForm.genre.value,
			album: document.updateSongForm.album.value,
			length: document.updateSongForm.length.value,
			artist: { id: artistId }
		};
		console.log('update songs', artistId, songId, updatedSong);
		updateSong(artistId, songId, updatedSong);
	});
	loadAllArtists();
};

function getArtistById(artistId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "api/artists/" + artistId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let artist = JSON.parse(xhr.responseText);
				console.log(artist);
				let tbody = document.getElementById('songTable');
				tbody.textContent = '';
				displayArtists(artist);
			} else {
				let doc = document.getElementById('artistsTable');
				let error = document.createElement('h3');
				error.textContent = "Artist not found: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function loadAllArtists() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "api/artists");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let artists = JSON.parse(xhr.responseText)
				displayArtists(artists);
			} else {
				let doc = document.getElementById('artistTable');
				let error = document.createElement('h3');
				error.textContext = "Artists not found: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function displayArtists(artists) {
	let tbody = document.getElementById('artistsTable');
	tbody.textContent = '';

	if (Array.isArray(artists)) {

		for (let artist of artists) {

			let tr = document.createElement('tr');

			let td = document.createElement('td');
			td.setAttribute('artistId', '' + artist.id);
			td.textContent = artist.id;
			tr.appendChild(td);

			td = document.createElement('td');
			let img = document.createElement('img');
			img.classList.add('thumbnail-image');
			img.src = artist.image;
			img.alt = "Artist Image";
			td.appendChild(img);
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = artist.name;
			tr.appendChild(td);

			td = document.createElement('td');

			let delBtn = document.createElement('button');
			delBtn.textContent = "Delete";
			delBtn.classList.add('btn');
			delBtn.addEventListener("click", function(e) {
				deleteArtist(artist);
			});
			td.appendChild(delBtn);
			tr.appendChild(td);


			tr.addEventListener('click', function(e) {
				getSongs(artist)
			});
			tbody.appendChild(tr);
		}
	} else {
		let tbody = document.getElementById('artistsTable');
		tbody.textContent = '';
		let tr = document.createElement('tr');

		let td = document.createElement('td');
		td.textContent = artists.id;
		tr.appendChild(td);

		td = document.createElement('td');
		let img = document.createElement('img');
		img.classList.add('thumbnail-image');
		img.src = artists.image;
		img.alt = "Artist Image";
		td.appendChild(img);
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = artists.name;
		tr.appendChild(td);

		td = document.createElement('td');
		let delBtn = document.createElement('button');
		delBtn.textContent = "Delete";
		delBtn.classList.add('btn');
		delBtn.addEventListener("click", function(e) {
			deleteArtist(artists);
		});
		td.appendChild(delBtn);
		tr.appendChild(td);


		tr.addEventListener('click', function(e) {
			getSongs(artists)
		});
		tbody.appendChild(tr);
	}
}

function deleteArtist(artist) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/artists/' + artist.id);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 204) {
				loadAllArtists();
			} else {
				let doc = document.getElementById('artistsTable');
				let error = document.createElement('h3');
				error.textContent = "Artist Not Deleted: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function deleteSong(artist, song) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/artists/' + artist.id + "/songs/" + song.id);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 204) {
				getSongs(artist)
			} else {
				let doc = document.getElementById('songTable');
				let error = document.createElement('h3');
				error.textContent = "Song Not Deleted: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function addArtist(artist) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/artists');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 201) {
				loadAllArtists();
			} else {
				let doc = document.getElementById('artistsTable');
				let error = document.createElement('h3');
				error.textContent = "Artist Not Created: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let newArtistJSON = JSON.stringify(artist);
	xhr.send(newArtistJSON);
}

function addSong(artistId, song) {
	console.log(artistId, song);
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/artists/' + artistId + '/songs');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 201) {
				getSongs({ id: artistId });
			} else {
				let doc = document.getElementById('songTable');
				let error = document.createElement('h3');
				error.textContent = "Song Not Created: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let newSongJSON = JSON.stringify(song);
	xhr.send(newSongJSON);
}

function getSongs(artist) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/artists/' + artist.id + "/songs");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let songs = JSON.parse(xhr.responseText);
				console.log(songs);
				displaySongs(artist, songs);
			} else {
				let doc = document.getElementById('songTable');
				let error = document.createElement('h3');
				error.textContent = "No songs found " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function displaySongs(artist, songs) {

	let tbody = document.getElementById('songTable');
	tbody.textContent = '';

	if (Array.isArray(songs)) {
		for (let song of songs) {
			let tr = document.createElement('tr');

			let td = document.createElement('td');
			td.setAttribute('songId', '' + song.id);
			td.textContent = song.id;
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = song.album;
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = song.name;
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = song.year;
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = song.genre;
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = song.length;
			tr.appendChild(td);

			td = document.createElement('td');
			let updateBtn = document.createElement('button');
			updateBtn.textContent = "Update";
			updateBtn.classList.add('btn');
			updateBtn.addEventListener("click", function(e) {
				let container = document.getElementById('songData');
				container.scrollTop = container.scrollHeight;
			});
			td.appendChild(updateBtn);
			let delBtn = document.createElement('button');
			delBtn.textContent = "Delete";
			delBtn.classList.add('btn');
			delBtn.addEventListener("click", function(e) {
				deleteSong(artist, song);
			});
			td.appendChild(delBtn);
			tr.appendChild(td);

			tr.addEventListener('click', function(e) {
			});
			tbody.appendChild(tr);
		}
	} else {
		let tr = document.createElement('tr');

		let td = document.createElement('td');
		td.setAttribute('songId', '' + songs.id);
		td.textContent = songs.id;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = songs.name;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = songs.year;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = songs.genre;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = songs.album;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = songs.length;
		tr.appendChild(td);

		td = document.createElement('td');
		let updateBtn = document.createElement('button');
		updateBtn.textContent = "Update";
		updateBtn.classList.add('btn');
		updateBtn.addEventListener("click", function(e) {
			let container = document.getElementById('songData');
			container.scrollTop = container.scrollHeight;
		});
		td.appendChild(updateBtn);
		let delBtn = document.createElement('button');
		delBtn.textContent = "Delete";
		delBtn.classList.add('btn');
		delBtn.addEventListener("click", function(e) {
			deleteSong(artist, songs);
		});
		td.appendChild(delBtn);
		tr.appendChild(td);
		tr.addEventListener('click', function(e) {
		});
		tbody.appendChild(tr);
	}
}


function getArtistByKeyword(keyword) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/artists/search/' + keyword);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let artists = JSON.parse(xhr.responseText);
				console.log(artists);
				let tbody = document.getElementById('songTable');
				tbody.textContent = '';
				displayArtists(artists);
			} else {
				let doc = document.getElementById('artistsTable');
				let error = document.createElement('h3');
				error.textContent = "No artists found: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function getSongsByKeyword(keyword) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/songs/search/' + keyword);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let songs = JSON.parse(xhr.responseText);
				console.log(songs);
				let tbody = document.getElementById('songTable');
				tbody.textContent = '';
				displaySongs(songs);
			} else {
				let doc = document.getElementById('artistsTable');
				let error = document.createElement('h3');
				error.textContent = "No songs found: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}
function getSongsByKeyword(keyword) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/songs/search/' + keyword);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				let songs = JSON.parse(xhr.responseText);
				console.log(songs);
				let tbody = document.getElementById('songTable');
				tbody.textContent = '';
				displaySearchedSongs(songs);
			} else {
				let doc = document.getElementById('artistsTable');
				let error = document.createElement('h3');
				error.textContent = "No songs found: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function displaySearchedSongs(songs) {
	let tbody1 = document.getElementById('artistsTable');
	tbody1.textContent = '';

	let tbody = document.getElementById('songTable');
	tbody.textContent = '';

	if (Array.isArray(songs)) {
		for (let song of songs) {
			let tr = document.createElement('tr');

			let td = document.createElement('td');
			td.setAttribute('songId', '' + song.id);
			td.textContent = song.id;
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = song.album;
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = song.name;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = song.year;
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = song.genre;
			tr.appendChild(td);

			td = document.createElement('td');
			td.textContent = song.length;
			tr.appendChild(td);

			td = document.createElement('td');
			let updatelBtn = document.createElement('button');
			updatelBtn.textContent = "Update";
			updatelBtn.classList.add('btn');
			updatelBtn.addEventListener("click", function(e) {
				addSong({ id: artistId }, song);
			});
			td.appendChild(updatelBtn);
			let delBtn = document.createElement('button');
			delBtn.textContent = "Delete";
			delBtn.classList.add('btn');
			delBtn.addEventListener("click", function(e) {
				deleteSong({ id: artistId }, song);
			});
			td.appendChild(delBtn);
			tr.appendChild(td);
			tbody.appendChild(tr);
		}
	}
}
function updateArtist(artistId, updatedArtist) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/artists/' + artistId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				loadAllArtists();
			} else {
				let doc = document.getElementById('artistsTable');
				let error = document.createElement('h3');
				error.textContent = "Artist Not Updated: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let updatedArtistJSON = JSON.stringify(updatedArtist);
	xhr.send(updatedArtistJSON);
}

function updateSong(artistId, songId, updatedSong) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/artists/' + artistId + '/songs/' + songId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				getSongs({ id: artistId });
			} else {
				let doc = document.getElementById('songTable');
				let error = document.createElement('h3');
				error.textContent = "Song Not Updated: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let updatedSongJSON = JSON.stringify(updatedSong);
	xhr.send(updatedSongJSON);
}





