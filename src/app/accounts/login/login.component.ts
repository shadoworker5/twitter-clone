import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_form: FormGroup;
  error_message = '';

  constructor(private authService: AuthService, private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.redirect();
  }

  initForm(){
    this.login_form = this.formBuilder.group({
      login: ['shadoworker5', Validators.required],
      password: ['tartempion', Validators.required]
    });
  }

  onSubmit(){
    const login = this.login_form.get('login').value;
    const password = this.login_form.get('password').value;
    
    this.authService.login(login, password).pipe(first())
      .subscribe(data => {
        if(data[0]['status']){
          this.authService.isAuth = true;
          this.authService.auth_id = data[0]['user_id'];
          this.route.navigate(['pages/home']);
        }else{
          this.error_message = data[0]['erreur'];
          this.login_form.get('password').reset('');
        }
        },
        error => {
          alert(error);
    });
  }

  redirect(){
    if(this.authService.getID() !== ""){
      this.route.navigate(['/pages/home']);
    }
  }
}