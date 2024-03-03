import { SpotifyService } from './../../services/spotify.service';
import { Songs } from './../../models/songs';
import { ArtistService } from './../../services/artist.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css',
})
export class ArtistsComponent {
  constructor(
    private artistService: ArtistService,
    private spotifyService: SpotifyService,

    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  //initialized parameter and variables
  songs: any[] = [];
  editArtist: Artist | null = null;
  newArtist: Artist = new Artist();
  title: string = 'Incompleted Artist Count: ';
  selected: any;
  artists: Artist[] = [];
  trackDetail: any;
  token: string = '';
  selectedSong: string = "";

  ngOnInit(): void {
    this.reload();
    this.spotifyService.getToken().subscribe((token) => {
      this.token = token;
    });
    this.activateRoute.paramMap.subscribe({
      next: (params) => {
        let artistIdStr = params.get('artistId');
        if (artistIdStr) {
          let artistId = parseInt(artistIdStr);
          if (isNaN(artistId)) {
            this.router.navigateByUrl('artistId');
          } else {
            this.getArtist(artistId);
          }
        }
      },
      error: (kaboom) => {
        console.error('Error retreiving artist');
        console.error(kaboom);
      },
    });
  }

  // toggleSelectedSong() {
  //   if (this.selectedSong == true) {
  //     this.selectedSong = false;
  //   } else {
  //     this.selectedSong = true;
  //   }
  // }

  //loaded the method on the page once subscribed call is made
  reload(): void {
    this.artistService.index().subscribe({
      next: (artist) => {
        this.artists = artist;
      },
      error: (problem) => {
        console.error('ArtistsComponent.reload(): error loading artists: ');
        console.error(problem);
      },
    });
  }

  getArtistSongs(id: number): void {
    this.artistService.getSongsFromArtist(id).subscribe({
      next: (songs) => {
        this.songs = Array.isArray(songs) ? songs : [songs]; // Ensure songs is always an array
      },
      error: (error) => {
        console.error(
          'ArtistsComponent.getArtistSongs(): error loading songs',
          error
        );
      },
    });
  }

  // getTodoCount() {
  //   return this.incompletePipe.transform(this.todos, false).length;
  // }
  displayArtists(artist: Artist) {
    this.selected = artist;
  }

  displayTable() {
    this.selected = null;
  }
  setEditArtist() {
    this.editArtist = Object.assign({}, this.selected);
  }

  getArtist(artistId: number) {
    this.artistService.show(artistId).subscribe({
      next: (artist) => {
        (this.selected = artist), this.reload();
      },
      error: () => {
        this.router.navigateByUrl('ArtistNotFound');
      },
    });
  }

  addArtist(artist: Artist) {
    this.artistService.create(artist).subscribe({
      next: (createdArtist) => {
        this.newArtist = new Artist();
        this.reload();
      },
      error: () => {},
    });
  }

  // saveArtist(artist: Artist) {
  //   this.artistService.saveArtist(artist).subscribe({
  //     next: (createdArtist) => {
  //       this.newArtist = new Artist();
  //       this.reload();
  //     },
  //     error: () => {},
  //   });
  // }

  updateArtist(artist: Artist, goToDetail = true) {
    console.log(artist);
    this.artistService.update(artist).subscribe({
      next: (updateArtist) => {
        this.editArtist = null;
        if (goToDetail) {
          this.selected = updateArtist;
        }
        this.reload();
      },
      error: (kaboom) => {
        console.error('Error updating artist');
        console.error(kaboom);
      },
    });
  }

  deleteArtist(id: number) {
    this.artistService.destroy(id).subscribe({
      next: () => {
        this.reload();
      },
      error: () => {},
    });
  }

  searchTrack(songName: string, artistName: string) {
    return this.spotifyService
      .searchTrack(this.token, `${songName} ${artistName}`)
      .subscribe((track) => {
        this.trackDetail = track;
        // Assuming songName is unique and can serve as an identifier
        this.selectedSong = songName;
      });
  }
  // get trackArtists() {
  //   return this.trackDetail.artists.map((artist) => artist.name).join(', ');
  // }
}

