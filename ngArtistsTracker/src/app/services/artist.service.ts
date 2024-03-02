import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Artist } from '../models/artist';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  // private baseUrl = 'http://localhost:8090/';
  private url = environment.baseUrl + 'api/artists';

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

  index(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ArtistService.index(): error retrieving Artist: ' + err)
        );
      })
    );
  }

  show(artistsId: number): Observable<Artist> {
    return this.http
      .get<Artist>(this.url + '/' + artistsId, this.getHttpOptions())
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
    return this.http.post<Artist>(this.url, artist, this.getHttpOptions()).pipe(
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
        this.url + '/' + editArtist.id,
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
      .delete<void>(`${this.url}/${id}`, this.getHttpOptions())
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

