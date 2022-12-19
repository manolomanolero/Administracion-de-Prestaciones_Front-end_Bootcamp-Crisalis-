import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public añadirUsuario(user: any) {
    return this.httpClient.post(`${baserUrl}/auth/register`, user);
  }

  public loguearUsuario(user: any) {
    return this.httpClient.post(`${baserUrl}/auth/login`, user);
  }
}
