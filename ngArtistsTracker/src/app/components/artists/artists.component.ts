import { SpotifyService } from './../../services/spotify.service';
import { ArtistService } from './../../services/artist.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../../models/artist';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { SongsComponent } from '../songs/songs.component';
import { SongsService } from '../../services/songs.service';
import { Songs } from '../../models/songs';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoginComponent,
    RegisterComponent,
    SongsComponent,
  ],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css',
})
export class ArtistsComponent {
  constructor(
    private songsService: SongsService,
    private artistService: ArtistService,
    private spotifyService: SpotifyService,
    private auth: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }

  songs: any;
  editArtist: any;
  newArtist: Artist = new Artist();
  title: string = 'Incompleted Artist Count: ';
  selected: any;
  artists: Artist[] = [];
  trackDetail: any;
  token: string = '';
  selectedSong: string = '';
  songDetail: any;
  newSong: Songs = new Songs();
  editSong: any;
  newSongSelected: boolean = false;
  editSongSelected: boolean = false;
  editArtistSelected: boolean = false;

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

  newSongToggle() {
    if (this.newSongSelected == false) {
      this.newSongSelected = true;
    } else {
      this.newSongSelected = false;
    }
  }

  editArtistToggle() {
    if (this.editArtistSelected == false) {
      this.editArtistSelected = true;
    } else {
      this.editArtistSelected = false;
    }
  }

  editSongToggle() {
    if (this.editSongSelected == false) {
      this.editSongSelected = true;
    } else {
      this.editSongSelected = false;
    }
  }

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
    //  this.artistService.getSongsFromArtist(this.selected.id).subscribe({
    //    next: (songs) => {
    //      this.songs = songs;
    //    },
    //    error: (problem) => {
    //      console.error('ArtistsComponent.reload(): error loading artists songs: ');
    //      console.error(problem);
    //    },
    //  });
  }

  getArtistSongs(id: number): void {
    this.artistService.getSongsFromArtist(id).subscribe({
      next: (songs) => {
        this.songs = songs;
      },
      error: (error) => {
        console.error(
          'ArtistsComponent.getArtistSongs(): error loading songs',
          error
        );
      },
    });
  }

  displayArtists(artist: Artist) {
    // this.searchTrack(artist.name, artist.band);
    this.selected = artist;
  }

  displayTable() {
    this.selected = null;
  }

  resetTable() {
    this.trackDetail = null;
  }

  resetSong() {
    this.songs = [];
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
        this.selectedSong = songName;
        console.log(this.trackDetail, this.selectedSong);
      });
  }

  searchArtist(query: string) {
    return this.spotifyService
      .searchArtist(this.token, query)
      .subscribe((artist: any) => {
        this.songDetail = artist;
        console.log(this.songDetail);
      });
  }

  addSongToArtist(artistId: number, newSong: Songs) {
    this.artistService.createSong(artistId, newSong).subscribe({
      next: (newSong) => {
        this.newSong = new Songs();
        this.reload();
      },
      error: () => {},
    });
  }

  removeSongFromArtist(artistId: number, songId: number) {
    this.songsService.destroy(artistId, songId).subscribe({
      next: () => {
        this.reload();
      },
      error: () => {},
    });
  }

  setNewSong() {
    this.selected = Object.assign({}, this.selected);
  }

  updateSongs(song: Songs, artistId:number, songId:number, goToDetail = true) {
    console.log(song);
    this.songsService.update(artistId, songId, song).subscribe({
      next: (song) => {
        this.editSong = null;
        this.reload();
      },
      error: (kaboom) => {
        console.error('Error updating artist');
        console.error(kaboom);
      },
    });
  }
}
