import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user_name = this.auth.getName();
  photo_path = this.auth.getAvatar();
  user_id = parseInt(this.auth.getID());

  constructor(private auth: AuthService, private route: Router, private user: RegisterService){ }

  ngOnInit(): void {
  }

  onLogout(){
    this.auth.delToken();
    this.route.navigate(['/']);
    //window.location.href = window.location.href ;
  }
}