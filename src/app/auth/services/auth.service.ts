import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../interfaces/httpResponse';
import { Login } from '../interfaces/login';
import { RecoverPassword } from '../interfaces/recoverPassword';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _url: string = `${environment.url}/auth`;

  constructor(private http: HttpClient) {}

  register(user: Register): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this._url}/register`, user).pipe(
      delay(2000),
      tap((resp: HttpResponse) => {
        if (resp.token) {
          localStorage.setItem('token', resp.token);
        }
      }),
      catchError((error) => of(error.error))
    );
  }

  login(userLogin: Login): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this._url}/login`, userLogin).pipe(
      delay(2000),
      tap((resp: HttpResponse) => {
        if (resp.token) {
          localStorage.setItem('token', resp.token);
        }
      }),
      catchError((error) => of(error.error))
    );
  }

  recoverPassword(recoverPassword: RecoverPassword): Observable<HttpResponse> {
    return this.http
      .post<HttpResponse>(`${this._url}/recover-password`, recoverPassword)
      .pipe(
        delay(2000),
        catchError((error) => of(error.error))
      );
  }
}
