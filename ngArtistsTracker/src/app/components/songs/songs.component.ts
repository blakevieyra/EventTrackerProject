import { ArtistsComponent } from './../artists/artists.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SongsService } from '../../services/songs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Songs } from '../../models/songs';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, FormsModule, ArtistsComponent],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css',
})
export class SongsComponent {
  constructor(
    // private ArtistsComponent: ArtistsComponent,
    private songsService: SongsService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  //initialized parameter and variables
  editSong: Songs | null = null;
  newSong: Songs = new Songs();
  title: string = 'Incompleted Song Count: ';
  selected: Songs | null = null;
  songs: Songs[] = [];

  ngOnInit(): void {
    this.reload();
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

  //loaded the method on the page once subscribed call is made
  reload(): void {
    this.songsService.index().subscribe({
      next: (songs) => {
        this.songs = songs;
      },
      error: (problem) => {
        console.error('SongsComponent.reload(): error loading songs: ');
        console.error(problem);
      },
    });
  }
  // getTodoCount() {
  //   return this.incompletePipe.transform(this.todos, false).length;
  // }
  displaySongs(songs: Songs) {
    this.selected = songs;
  }

  displayTable() {
    this.selected = null;
  }
  setEditSong() {
    this.editSong = Object.assign({}, this.selected);
  }

  getSong(songsId: number) {
    this.songsService.show(songsId).subscribe({
      next: (song) => {
        (this.selected = song), this.reload();
      },
      error: () => {
        this.router.navigateByUrl('SongNotFound');
      },
    });
  }

  addSong(song: Songs) {
    this.songsService.create(song).subscribe({
      next: (createdTodo) => {
        this.newSong = new Songs();
        this.reload();
      },
      error: () => {},
    });
  }

  updateSong(song: Songs, goToDetail = true) {
    console.log(song);
    this.songsService.update(song).subscribe({
      next: (updatedSong) => {
        this.editSong = null;
        if (goToDetail) {
          this.selected = updatedSong;
        }
        this.reload();
      },
      error: (kaboom) => {
        console.error('Error updating song');
        console.error(kaboom);
      },
    });
  }

  deleteSong(id: number) {
    this.songsService.destroy(id).subscribe({
      next: () => {
        this.reload();
      },
      error: () => {},
    });
  }
}



