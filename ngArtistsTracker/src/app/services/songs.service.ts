import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Songs } from './../models/songs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private url = environment.baseUrl + 'api/songs';
  private urlArtists = environment.baseUrl + 'api/artists';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<Songs[]> {
    return this.http.get<Songs[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('SongsArtist.index(): error retrieving songs: ' + err)
        );
      })
    );
  }

  indexAll(): Observable<Songs[]> {
    return this.http.get<Songs[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('SongsArtist.index(): error retrieving songs: ' + err)
        );
      })
    );
  }

  searchSongs(keyword: string): Observable<Songs[]> {
    return this.http
      .get<Songs[]>(this.url + '/search/' + keyword, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'SongsService.index(): error retrieving Artist by keyword: ' +
                  err
              )
          );
        })
      );
  }

  show(songsId: number): Observable<Songs> {
    return this.http
      .get<Songs>(this.url + '/' + songsId, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('SongsService.index(): error retrieving songs: ' + err)
          );
        })
      );
  }

  create(artistsId: number, newSong: Songs): Observable<Songs> {
    return this.http
      .post<Songs>(
        `${this.urlArtists}/${artistsId}/songs`,
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

  update(
    artistsId: number,
    songId: number,
    editSong: Songs
  ): Observable<Songs> {
    return this.http
      .put<Songs>(
        `${this.urlArtists}/${artistsId}/songs/${songId}`,
        editSong,
        this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'SongsService.update(): error updating song for artist: ' + err
              )
          );
        })
      );
  }

  destroy(artistId: number, songId: number): Observable<void> {
    return this.http
      .delete<void>(
        `${this.urlArtists}/${artistId}/songs/${songId}`,
        this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('SongsService.delete(): error deleting song: ' + err)
          );
        })
      );
  }
}
