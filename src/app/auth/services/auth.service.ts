import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environmets } from '../../../environments/environmets';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = Environmets.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }


  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);

  }




  login(email: string, password: string): Observable<User> {

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => {
          this.user = user;
          localStorage.setItem('token',
            'asAShjSGHjashd.asdapdasdkadkflsd.sfsjaf'
          );
        })
      )
  }


  checkAuthentication(): Observable<boolean> {

    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      );

  }

  logout(): void {
    this.user = undefined;
    localStorage.clear()
  }
}
