import { environment } from '../../environments/environment';
import { Songs } from './../models/songs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Artist } from '../models/artist';
import { AuthService } from './auth.service';
import { SongsService } from './songs.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private url = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private songService: SongsService
  ) {}

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }
  saveArtist(artist: Artist) {
    this.auth.user.artists.push(artist);
  }

  // removeArtist(artist: Artist) {
  //   this.auth.user.artists.(artist);
  // }

  all(): Observable<Artist[]> {
    return this.http
      .get<Artist[]>(this.url + 'api', this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'Artistservice.all(): error retrieving all artist: ' + err
              )
          );
        })
      );
  }

  searchArtist(keyword: string): Observable<Artist[]> {
    return this.http
      .get<Artist[]>(this.url + 'api/search/' + keyword, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'ArtistService.index(): error retrieving Artist by keyword: ' +
                  err
              )
          );
        })
      );
  }

  index(): Observable<Artist[]> {
    return this.http
      .get<Artist[]>(this.url + 'api/artists', this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'ArtistService.index(): error retrieving Artist: ' + err
              )
          );
        })
      );
  }

  show(artistsId: number): Observable<Artist> {
    return this.http.get<Artist>(this.url + 'api/artists' + '/' + artistsId, this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'ArtistService.index(): error retrieving artist: ' + err
              )
          );
        })
      );
  }

  create(artist: Artist): Observable<Artist> {
    return this.http
      .post<Artist>(this.url + 'api/artists', artist, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('ArtistService.create(): error creating artist: ' + err)
          );
        })
      );
  }

  update(editArtist: Artist): Observable<Artist> {
    return this.http
      .put<Artist>(
        this.url + 'api/artists' + '/' + editArtist.id,
        editArtist,
        this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('ArtistService.update(): error updating artist: ' + err)
          );
        })
      );
  }

  destroy(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.url + 'api/artists'}/${id}`, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'ArtistService.delete(): error deleting artists: ' + err
              )
          );
        })
      );
  }

  getSongsFromArtist(id: number): Observable<Songs> {
    return this.http
      .get<Songs>(
        `${this.url + 'api/artists'}/${id}/songs`,
        this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('ArtistService.getSongs(): error getting songs: ' + err)
          );
        })
      );
  }
  createSong(artistsId: number, newSong: Songs): Observable<Songs> {
    return this.http
      .post<Songs>(this.url + 'api/artists' + '/' + artistsId + '/songs',
        newSong,
        this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'SongsService.create(): error creating song for artist: ' + err
              )
          );
        })
      );
  }
}
