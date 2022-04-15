import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {
  private url_get = "http://127.0.0.1/data/users.php";
  private url_follow = "http://127.0.0.1/data/follow.php";

  constructor(private http: HttpClient) { }

  getUserList(user_id: number): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const post_data = {
      'user_id' : user_id
    };

    return this.http.post<any[]>(this.url_get, post_data, httpOptions)
            .pipe(map(data => {
              return data;
            }));
  }

  follow(user_id1: number, user_id2: number): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const post_data = {
      'user_id1' : user_id1,
      'user_id2' : user_id2,
    };

    return this.http.post<any[]>(this.url_follow, post_data, httpOptions)
            .pipe(map(data => {
              return data;
            }));
  }
}