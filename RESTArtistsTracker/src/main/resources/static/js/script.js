console.log("js loaded")

window.addEventListener("load", function(e) {
	console.log(e);
	loadAllArtists();
});

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
			td.textContent = artist.name;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = artist.band;
			tr.appendChild(td);

			tr.addEventListener('click', function(evt) {
				console.log(evt.target)
				let artistsId = evt.target.parentElement.firstElementChild.textContent
				console.log(artistsId);
			});
		}
	}
}


