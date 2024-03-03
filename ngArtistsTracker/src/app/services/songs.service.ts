import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Songs } from './../models/songs';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  // private baseUrl = 'http://localhost:8090/';
  private url = environment.baseUrl + 'api/songs';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private auth: AuthService
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
      .get<Songs[]>(this.url + 'search/' + keyword, this.getHttpOptions())
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

  create(song: Songs): Observable<Songs> {
    return this.http.post<Songs>(this.url, song, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('SongsService.create(): error creating song: ' + err)
        );
      })
    );
  }

  update(editSongs: Songs): Observable<Songs> {
    // if (editArtist.completeDate) {
    //   editArtist.completeDate = this.datePipe.transform(Date.now(), 'shortDate'); //  7/23/23
    // } else {
    //   editTodo.completeDate = '';
    // }
    return this.http
      .put<Songs>(
        this.url + '/' + editSongs.id,
        editSongs,
        this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('SongsService.update(): error updating song: ' + err)
          );
        })
      );
  }

  destroy(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, this.getHttpOptions())
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
