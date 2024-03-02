import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private url = environment.baseUrl + 'api/artists';
  constructor(private http: HttpClient) {}

  index(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ArtistService.index(): error retrieving Artist: ' + err)
        );
      })
    );
  }
}
