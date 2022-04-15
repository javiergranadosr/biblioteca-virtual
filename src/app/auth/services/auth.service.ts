import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../interfaces/httpResponse';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _url: string =  `${environment.url}/auth`;

  constructor(private http: HttpClient) {}

  register(user: Register): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this._url}/register`, user).pipe(delay(2000));
  }
}
