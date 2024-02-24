window.addEventListener("load", function(e) {
	e.preventDefault();
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
	loadAllArtists();
};

function loadAllArtists() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "api/artists");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let artists = JSON.parse(xhr.responseText)
				displayArtists(artists);
			} else {
				let doc = document.getElementById('artistData');
				let error = document.createElement('h1');
				error.textContext = "Artists not found: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function displayArtists(artists) {
	if (artists && Array.isArray(artists) && artists.length > 0) {
		let tbody = document.getElementById('artistsTable');
		tbody.textContent = '';


		for (let artist of artists) {
			let tr = document.createElement('tr');
			tbody.appendChild(tr);
			let td = document.createElement('td');
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
			td.textContent = artist.band;
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
		}
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
				let doc = document.getElementById('addArtistsDiv');
				let error = document.createElement('h1');
				error.textContent = "Artist Not Deleted: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function deleteSong(song) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/artists/' + document.targe + "/songs/" + song.id);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 204) {
				getSongs(artist)
			} else {
				let doc = document.getElementById('addArtistsDiv');
				let error = document.createElement('h1');
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
				let doc = document.getElementById('addArtistsDiv');
				let error = document.createElement('h1');
				error.textContent = "Artist Not Created: " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let newArtistJSON = JSON.stringify(artist);
	xhr.send(newArtistJSON);
}

function addSong(artist, song) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/artists/' + artist.id + "/songs");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 201) {
				getSongs(artist);
			} else {
				let doc = document.getElementById('addArtistsDiv');
				let error = document.createElement('h1');
				error.textContent = "Artist Not Created: " + xhr.status;
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
				let doc = document.getElementById('songData');
				let error = document.createElement('h1');
				error.textContent = "No songs found " + xhr.status;
				doc.appendChild(error);
			}
		}
	};
	xhr.send();
}

function displaySongs(artist, songs) {
	if (songs && Array.isArray(songs) && songs.length > 0) {

		let tbody = document.getElementById('songTable');
		tbody.textContent = '';

		for (let song of songs) {
			tr = document.createElement('tr');
			let td = document.createElement('td');
			td.textContent = song.name;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = song.genre;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = song.album;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = song.length;
			tr.appendChild(td);
			td = document.createElement('td');
			let delBtn = document.createElement("button")
			delBtn.textContent = "Delete";
			delBtn.classList.add('btn');
			delBtn.addEventListener("click", function(e) {
				deleteSong(artist, song);
			});
			td.appendChild(delBtn);
			tbody.appendChild(tr);
		}
		let returnButton = document.createElement('button');
		returnButton.textContent = "Go Back";
		returnButton.classList.add('btn');
		returnButton.addEventListener('click', function(evt) {
			loadAllArtists();
		});
		tbody.appendChild(returnButton);
		document.addingSongForm.addSongbtn.addEventListener('click', function(e) {
			e.preventDefault();
			console.log('adding songs');
			let song = {
				name: addingSongForm.name.value,
				genre: addingSongForm.genre.value,
				album: addingSongForm.album.value,
				length: addingSongForm.length.value,
			};
			addSong(artist, song);
		});

	}
}
//song: {
//name: addingArtistForm.name.value
//name: addingArtistForm.name.value
//album: addingArtistForm.album.value
//length: addingArtistForm.length.value
//}



