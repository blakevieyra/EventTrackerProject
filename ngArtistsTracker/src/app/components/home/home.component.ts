import { CommonModule } from '@angular/common';
import { Artist } from './../../models/artist';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { RegisterComponent } from "../register/register.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, FormsModule, RegisterComponent]
})
export class HomeComponent implements OnInit {
  constructor(private artistService: ArtistService) {}

  artists: Artist[] = [];

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(): void {
    this.artistService.index().subscribe({
      next: (artist) => {
        this.artists = artist;
        console.log(this.artists)
      },
      error: (problem) => {
        console.error('ArtistComponent.loadArtists(): error loading artists: ');
        console.error(problem);
      },
    });
  }
}
