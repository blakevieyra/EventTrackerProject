import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Artist } from './../../models/artist';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RegisterComponent,
    LoginComponent,
    CarouselComponent,
  ],
})
export class HomeComponent implements OnInit {
  constructor(
    private artistService: ArtistService,
    private auth: AuthService,
    private spotifyService: SpotifyService,
    private route: Router
  ) {}

  selected: boolean = false;
  newArtist: Artist | null = null;
  favorite: boolean = false;
  artists: Artist[] = [];
  keyword: string = '';
  trackDetail: any;
  token: string = '';
  selectedSong: string = '';
  songDetail: any;
  artistInfo: any;

  ngOnInit(): void {
    this.spotifyService.getToken().subscribe((token) => {
      this.token = token;
    });
  }

  loadArtists(): void {
    this.artistService.all().subscribe({
      next: (artist) => {
        this.artists = artist;
        // console.log(this.artists);
      },
      error: (problem) => {
        console.error(
          'ArtistComponent.loadArtists(): error loading all artists: '
        );
        console.error(problem);
      },
    });
  }
  toggleSelected() {
    this.selected = true;
  }

  keywordSearch(keyword: string): void {
    this.artistService.searchArtist(keyword).subscribe({
      next: (artist) => {
        this.artists = artist;
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

  addArtistToUser(artist: Artist) {
    this.artistService.create(artist).subscribe({
      next: (createdArtist) => {
        this.newArtist = new Artist();
        //this.loadArtists();
      },
      error: () => {},
    });
  }

  removeArtistFromUser(artist: Artist) {
    this.artistService.destroy(artist.id).subscribe({
      next: () => {
        // this.loadArtists();
      },
      error: () => {},
    });
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }

  toggleArtist(event: any, artist: any): void {
    if (event.target.checked) {
      this.addArtistToUser(artist);
    } else {
      this.removeArtistFromUser(artist);
    }
  }
  searchArtist(query: string) {
    return this.spotifyService
      .searchArtist(this.token, query)
      .subscribe((artist: any) => {
        this.songDetail = artist;
        console.log(this.songDetail);
      });
  }
  setEditSong() {
    this.selected = Object.assign({}, this.selected);
  }

  setNewSong() {
    this.selected = Object.assign({}, this.selected);
  }

  getInfo(artist: Artist) {
    this.artistInfo = artist;
  }
}
