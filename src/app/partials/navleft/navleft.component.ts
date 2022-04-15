import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-navleft',
  templateUrl: './navleft.component.html',
  styleUrls: ['./navleft.component.css']
})
export class NavleftComponent implements OnInit {
  tweet: FormGroup;
  error_message = '';

  constructor(private form_builder: FormBuilder, public auth: AuthService, private send_post: PostsService){ }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(){
    this.tweet = this.form_builder.group({
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(){
    const content = this.tweet.get('content').value;
    const user_id = parseInt(this.auth.getID());
    
    this.send_post.sendPost(user_id, content).subscribe(data => {
      if(data[0]['status'] === 'success'){
        this.tweet.get('content').reset('');
        this.error_message = "";
      }else{
        this.error_message = data[0]['erreur'];
      }
    });
  }

  flash_info(){
    // code of flash notification
  }
}