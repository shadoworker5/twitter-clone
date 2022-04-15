import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPosts } from '../interfaces/post';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url_get = "http://127.0.0.1/data/posts.php";
  private url_send = "http://127.0.0.1/data/send_post.php";
  private url_like = "http://127.0.0.1/data/like.php";
  private url_dislike = "http://127.0.0.1/data/dislike.php";
  private url_reply = "http://127.0.0.1/data/reply_post.php";
  private url_get_user_post = "http://127.0.0.1/data/user_posts.php";
  
  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPosts[]>{
    return this.http.get<IPosts[]>(this.url_get)
            .pipe(map(data => {
              
              return data;
            }));
  }

  sendPost(user_id: number, content: string): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const post_data = {
      'user_id' : user_id,
      'content': content
    };
    return this.http.post<any[]>(this.url_send, post_data, httpOptions)
          .pipe(map(data => {
            return data;
          }));
  }

  replyPost(user_id: number, post_id: number, content: string): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const post_data = {
      'user_id' : user_id,
      'post_id' : post_id,
      'content' : content
    };
    return this.http.post<any[]>(this.url_reply, post_data, httpOptions)
          .pipe(map(data => {
            return data;
          }));
  }

  addLike(id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const post_data = {
      'post_id' : id
    };
    return this.http.post<any[]>(this.url_like, post_data, httpOptions)
          .pipe(map(data => {
            return data;
          }));
  }

  addDislike(id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const post_data = {
      'post_id' : id
    };
    return this.http.post<any[]>(this.url_dislike, post_data, httpOptions)
          .pipe(map(data => {
            return data;
          }));
  }

  getLikeCount(id: number){
    const count = 0;
    return id;
  }

  getDisLikeCount(id: number){
    return id;
  }

  // about on use
  getUserPosts(user_id: number): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const post_data = {
      'user_id' : user_id
    };

    return this.http.post<any[]>(this.url_get_user_post, post_data, httpOptions)
            .pipe(map(data => {
              
              return data;
            }));
  }
}