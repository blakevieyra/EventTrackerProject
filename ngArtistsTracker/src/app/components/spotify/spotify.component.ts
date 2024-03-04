// app.component.ts
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css'],
})
export class SpotifyComponent implements OnInit {
  trackDetail: any;
  token: string = '';

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.spotifyService.getToken().subscribe((token) => {
      this.token = token;
    });
  }

  searchTrack(query: string) {
    if (!query) return;
    this.spotifyService
      .searchTrack(this.token, query)
      .subscribe((track: any) => {
        this.trackDetail = track;
      });
  }

  searchArtist(query: string) {
    if (!query) return;
    this.spotifyService
      .searchArtist(this.token, query)
      .subscribe((track: any) => {
        this.trackDetail = track;
      });
  }
}
