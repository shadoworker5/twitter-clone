import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public posts_list = [];
  public user_info = {
    'name': '',
    'pseudo': '',
    'email' : '',
    'followers': 0,
    'followings': 0
  };
  modify = false;
  error_message: any;
  modify_form: FormGroup;
  error_password = '';

  constructor(private route: ActivatedRoute, protected post_service: PostsService, private form_builder: FormBuilder, protected profile: ProfileService){ }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadAllPost(+id);
    this.initForm();
    this.loadProfile(+id);
  }

  loadAllPost(id: number){
    this.post_service.getUserPosts(id)
      .subscribe(data => {
        this.posts_list = data
    });
  }

  loadProfile(id: number){
    this.profile.getUserInfo(id)
      .subscribe(data => {
        this.user_info.name = data[0]['name'];
        this.user_info.pseudo = data[0]['pseudo'];
        this.user_info.email = data[0]['email'];
        this.user_info.followers = data[0]['followers'];
        this.user_info.followings = data[0]['followings']
    });
  }

  learn_more(id: number){
    let get_comment = document.getElementById('comment_'+id);
    let btn_to_hide = document.getElementById('hide_btn_'+id);
    
    get_comment.style.opacity = '0.2';
    setTimeout(() => {
      get_comment.style.height = 'auto';
      get_comment.style.opacity = '1';
      btn_to_hide.style.visibility = "hidden"
    }, 1000);
  }

  like_post(id: number){
    this.post_service.addLike(id).subscribe(data => {
      
      if(data[0]['status'] === 'success'){
        alert(data[0]['status']);
      }
    });
    location.reload();
  }
  
  dislike_post(id: number){
    this.post_service.addDislike(id).subscribe(data => {
      if(data[0]['status'] === 'success'){
        alert(data[0]['status']);
      }
    });
    location.reload();
  }

  event_modify(){
    // document.getElementsByTagName("button")
    // this.loadProfile();
    if(!this.modify){
      this.modify = true;
    }else{
      this.modify = false;
    }
  }

  initForm(){
    this.modify_form = this.form_builder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
    // password: ['', [Validators.required, Validators.minLength(8)]],
    // password_confirm: ['', [Validators.required, Validators.minLength(8)]]
  }

  onSubmit(){
    // const name = this.modify_form.get('name').value;
    // const pseudo = this.modify_form.get('pseudo').value;
    // const email = this.modify_form.get('email').value;
    // const password = this.modify_form.get('password').value;
    // const password_confirm = this.modify_form.get('password_confirm').value;
    // if(password !== password_confirm){
    //   this.error_password = "Your password is incorrect";
    // }else{
    //   let test = this.register.register(new User(name, pseudo, email, password));
    //   alert(test)
    // }
  }

  get_error(name){
    return this.modify_form.get(name);
  }
}