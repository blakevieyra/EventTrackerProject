import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Artist } from '../models/artist';
// import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  // private baseUrl = 'http://localhost:8090/';
  private url = environment.baseUrl;

  constructor(
    private http: HttpClient,
    // private datePipe: DatePipe,
    private auth: AuthService,
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
    return this.http
      .get<Artist>(
        this.url + 'api/artists' + '/' + artistsId,
        this.getHttpOptions()
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
    // if (editArtist.completeDate) {
    //   editArtist.completeDate = this.datePipe.transform(Date.now(), 'shortDate'); //  7/23/23
    // } else {
    //   editTodo.completeDate = '';
    // }
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
}
