import { Injectable } from '@angular/core';
import { User } from "../models/user.model";
import { Subject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { IAuth } from '../interfaces/auth';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = "http://127.0.0.1/data/register.php";
  
  constructor(private http: HttpClient) { }
 
  register(user: User): Observable<IAuth>{
    // let form_data = new FormData();
    // form_data.append('name', user.name);
    // form_data.append('pseudo', user.pseudo);
    // form_data.append('email', user.email);
    // form_data.append('password', user.password);

    // let xhr = new XMLHttpRequest();
    // xhr.open('POST', this.url);
    
    // xhr.onreadystatechange = function(){
    //   if(xhr.readyState === 4 && xhr.status === 200){
    //     alert(JSON.parse(xhr.responseText));
    //   }
    // }
    // xhr.send(form_data);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });

    let httpOptions = { headers : headers }

    // let test = this.http.post<IAuth>(this.url, user, httpOptions).subscribe(
      // );

    return this.http.post<IAuth>(this.url, user, httpOptions);
  }

  delete_user(i: number){
    
  }

  find_user_by_id(id: number){
    
  }

  is_already_use(value){
    // code
  }
}

// private currentUserSubject: BehaviorSubject<User>;
//     public currentUser: Observable<User>;

//     constructor(private http: HttpClient) {
//         this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
//         this.currentUser = this.currentUserSubject.asObservable();
//     }

//     public get currentUserValue(): User {
//         return this.currentUserSubject.value;
//     }

//     login(username, password) {
//         return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
//             .pipe(map(user => {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('currentUser', JSON.stringify(user));
//                 this.currentUserSubject.next(user);
//                 return user;
//             }));
//     }

//     logout() {
//         // remove user from local storage and set current user to null
//         localStorage.removeItem('currentUser');
//         this.currentUserSubject.next(null);
//     }