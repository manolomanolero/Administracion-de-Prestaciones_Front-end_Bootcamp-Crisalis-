import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  public loginStatusSubjec = new Subject<boolean>();

  public user = {
    username: '',
    email: '',
    authorities: ''
  };

  constructor(private http: HttpClient) {}

  //generamos el token
  public loginUser(loginData: any) {
    return this.http.post(`${baserUrl}/auth/login`, loginData);
  }

  public saveTokenAndData(token: any) {
    this.saveToken(token);
    /* Invalid token. Try to resolve base64 encoding on backend
    var decoded = jwt_decode(token);
    console.log(decoded);*/

  }

  /*public getCurrentUser() {
    return this.http.get(`${baserUrl}/actual-usuario`);
  }*/

  //iniciamos sesión y establecemos el token en el localStorage
  public saveToken(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //cerramos sesion y eliminamos el token del localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
