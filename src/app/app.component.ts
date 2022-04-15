import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cloneTwitter';
  current_route: any;

  constructor(private route: Router, private auth: AuthService){}

  ngOnInit(){
    this.update_menu();
    // this.redirect();
  }
  
  update_menu(){
    setInterval(()=>{
      if(this.route.url.startsWith('/index'))
        this.current_route = true;
      else if(this.route.url.startsWith('/accounts/login'))
        this.current_route = true;
      else if(this.route.url.startsWith('/accounts/register'))
        this.current_route = true;
      else
      this.current_route = false;
    }, 5);
  }

  redirect(){
    if(this.auth.getID() !== ""){
      this.route.navigate(['/pages/home']);
    }
  }
}