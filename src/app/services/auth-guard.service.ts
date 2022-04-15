import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const rout_url: string = state.url;
    
    return this.isLogin(rout_url);
  }
  
  
  isLogin(route: string){
    if(this.authService.isLogged()){
      return true;
    }
    this.router.navigate(['accounts/login']);
  }
}