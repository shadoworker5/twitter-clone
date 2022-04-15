import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error_message: any;
  register_form: FormGroup;
  error_password = '';

  constructor(private register: RegisterService, private route: Router, private form_builder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    this.redirect();
  }

  initForm(){
    this.register_form = this.form_builder.group({
      name: ['Traore Kassoum', [Validators.required, Validators.minLength(5)]],
      pseudo: ['shadow', [Validators.required, Validators.minLength(3)]],
      email: ['shadow@admin.com', [Validators.required, Validators.email]],
      password: ['qwertyuiop', [Validators.required, Validators.minLength(8)]],
      password_confirm: ['qwertyuiop', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(){
    const name = this.register_form.get('name').value;
    const pseudo = this.register_form.get('pseudo').value;
    const email = this.register_form.get('email').value;
    const password = this.register_form.get('password').value;
    const password_confirm = this.register_form.get('password_confirm').value;
    if(password !== password_confirm){
      this.error_password = "Your password is incorrect";
    }else{
      let test = this.register.register(new User(name, pseudo, email, password));
      alert(test)
    }    
  }

  get_error(name){
    return this.register_form.get(name);
  }

  redirect(){
    if(this.auth.getID() !== ""){
      this.route.navigate(['/pages/home']);
    }
  }
}