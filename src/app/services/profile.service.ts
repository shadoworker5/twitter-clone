import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url_get = "http://127.0.0.1/data/get_profile.php";

  constructor(private http: HttpClient){ }

  getUserInfo(user_id: number): Observable<any[]>{
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

  getFollowers(count: number){
    return count;
  }
  
  getFollowings(count: number){
    return count;
  }
}