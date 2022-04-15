import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NavleftComponent } from './partials/navleft/navleft.component';
import { NavrightComponent } from './partials/navright/navright.component';
import { LoginComponent } from './accounts/login/login.component';
import { RegisterComponent } from './accounts/register/register.component';
import { ChangepasswordComponent } from './accounts/changepassword/changepassword.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { RegisterService } from "./services/register.service";
import { ProfileService } from "./services/profile.service";
import { FollowerService } from "./services/follower.service";
import { PostsService } from "./services/posts.service";
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './pages/profile/profile.component';
import { FourToFourComponent } from './pages/four-to-four/four-to-four.component';


const appRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'accounts/login', component: LoginComponent },
  { path: 'accounts/register', component: RegisterComponent },
  { path: 'pages/home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'pages/profile/:id', canActivate: [AuthGuardService], component: ProfileComponent },
  { path: 'pages/four-to-four', component: FourToFourComponent },
  { path: '', redirectTo: 'pages/four-to-four', pathMatch: 'full'},
  { path: '**', redirectTo: 'pages/four-to-four'}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavleftComponent,
    NavrightComponent,
    LoginComponent,
    RegisterComponent,
    ChangepasswordComponent,
    IndexComponent,
    HomeComponent,
    ProfileComponent,
    FourToFourComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AuthService,
    RegisterService,
    AuthGuardService,
    PostsService,
    ProfileService,
    FollowerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
