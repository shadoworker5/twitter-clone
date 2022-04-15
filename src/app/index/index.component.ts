import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  login_form: FormGroup;
  error_message = '';

  constructor(private route: Router, private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {    
    this.initForm();
  }

  initForm(){
    this.login_form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(){
    const login = this.login_form.get('login').value;
    const password = this.login_form.get('password').value;
    this.auth.login(login, password).subscribe(data => {
      if(data[0]['status']){
        this.auth.isAuth = true;
        this.route.navigate(['pages/home']);
      }else{
        this.error_message = data[0]['erreur'];
      }
    });
  }
}