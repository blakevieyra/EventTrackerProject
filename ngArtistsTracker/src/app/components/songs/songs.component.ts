import { AuthService } from './../../services/auth.service';
import { ArtistsComponent } from './../artists/artists.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SongsService } from '../../services/songs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Songs } from '../../models/songs';
import { CarouselComponent } from '../carousel/carousel.component';
import { LoginComponent } from '../login/login.component';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ArtistsComponent,
    CarouselComponent,
    LoginComponent,
  ],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css',
})
export class SongsComponent {
  constructor(
    // private ArtistsComponent: ArtistsComponent,
    private auth: AuthService,
    private songsService: SongsService,
    private spotifyService: SpotifyService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  //initialized parameter and variables
  selected: boolean = false;
  show: boolean = false;
  editSong: Songs | null = null;
  newSong: Songs | null = null;
  title: string = 'Incompleted Song Count: ';
  song: Songs | null = null;
  mySongs: Songs[] = [];
  keyword: string = '';
  trackDetail: any;
  token: string = '';
  selectedSong: string = '';
  songDetail: any;

  ngOnInit(): void {
    // this.reload();
    this.spotifyService.getToken().subscribe((token) => {
      this.token = token;
    });
    this.activateRoute.paramMap.subscribe({
      next: (params) => {
        let songsIdStr = params.get('songsId');
        if (songsIdStr) {
          let songsId = parseInt(songsIdStr);
          if (isNaN(songsId)) {
            this.router.navigateByUrl('songsId');
          } else {
            this.getSong(songsId);
          }
        }
      },
      error: (kaboom) => {
        console.error('Error retreiving song');
        console.error(kaboom);
      },
    });
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }
  //loaded the method on the page once subscribed call is made
  reload(): void {
    this.songsService.index().subscribe({
      next: (songs) => {
        this.mySongs = songs;
      },
      error: (problem) => {
        console.error('SongsComponent.reload(): error loading songs: ');
        console.error(problem);
      },
    });
  }

  displayTable() {
    this.song = null;
  }
  setEditSong() {
    this.selected = Object.assign({}, this.selected);
  }

  setNewSong() {
    this.selected = Object.assign({}, this.selected);
  }

  getSong(songsId: number) {
    this.songsService.show(songsId).subscribe({
      next: (song) => {
        (this.song = song), this.reload();
      },
      error: () => {
        this.router.navigateByUrl('SongNotFound');
      },
    });
  }

  toggleSelected() {
    this.selected = true;
  }

  addSongToArtist(artistId: number, newSong: Songs) {
    this.songsService.create(artistId, newSong).subscribe({
      next: (newSong) => {
        this.newSong = new Songs();
        //this.loadArtists();
      },
      error: () => {},
    });
  }

  removeSongFromArtist(artistId: number, song: Songs) {
    this.songsService.destroy(artistId, song.id).subscribe({
      next: () => {
        // this.loadArtists();
      },
      error: () => {},
    });
  }

  keywordSearch(keyword: string): void {
    this.songsService.searchSongs(keyword).subscribe({
      next: (song) => {
        this.mySongs = song;
        //console.log(this.artists);
      },
      error: (problem) => {
        console.error(
          'ArtistComponent.loadArtists(): error keyword searching artists: '
        );
        console.error(problem);
      },
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
  toggleShowMethod($event: Event): void {
    $event.stopPropagation();
    this.toggleShow = !this.toggleShow;
  }

  toggleShow = false;
  searchAndToggle(trackName: string, trackGenre: string): void {
    this.searchTrack(trackName, trackGenre);
    this.toggleShow = !this.toggleShow;
  }
}



