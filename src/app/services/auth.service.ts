import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://127.0.0.1/data/login.php";
  isAuth = false;
  auth_id: number;

  @Output() getLoggedInRigth: EventEmitter<any> = new EventEmitter();

  
  constructor(private http: HttpClient) { }
  
  check_if_user_is_auth(){
    // return this.http.get(this.url);
  }

  login(login: string, password: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const user_data = {
      'login' : login,
      'password': password
    };

    return this.http.post<any>(this.url, user_data)
          .pipe(map(data => {
            this.setToken(data[0]['right']);
            this.setID(data[0]['user_id']);
            this.setAvatar(data[0]['avatar_path']);
            this.setName(data[0]['name']);
            this.getLoggedInRigth.emit(true);
            return data;
          }));
  }

  logout(){
    this.isAuth = false;
  }

  setToken(token: string){
    localStorage.setItem('token', token)
  }

  setID(id: number){
    localStorage.setItem("user_id", String(id));
  }

  setAvatar(path: string){
    localStorage.setItem('avatar', path);
  }

  getID(){
    return localStorage.getItem("user_id");
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getAvatar(){
    return localStorage.getItem('avatar');
  }

  setName(name: string){
    localStorage.setItem('name', name);
  }

  getName(){
    return localStorage.getItem('name');
  }

  delToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
  }

  isLogged(){
    const user_token = this.getToken();

    if(user_token !== null){
      return true;
    }else{
      return false;
    }
  }
}