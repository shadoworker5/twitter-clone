import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public posts_list = [];
  post_form: FormGroup;
  reply_post: FormGroup;

  constructor(protected post_service: PostsService, private form_builder: FormBuilder, private auth: AuthService){}

  ngOnInit(): void {
    this.load_all_posts();
    this.initForm();
    this.initReply();
    this.add_refresh();
  }

  initForm(){
    this.post_form = this.form_builder.group({
      content: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  initReply(){
    this.reply_post = this.form_builder.group({
      repl: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  
  load_all_posts(){
    this.post_service.getPosts()
      .subscribe(data => {
        this.posts_list = data
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
        this.load_all_posts();
      }
    });
  }
  
  dislike_post(id: number){
    this.post_service.addDislike(id).subscribe(data => {
      if(data[0]['status'] === 'success'){
        this.load_all_posts();
      }
    });
  }

  submit_reply(id_post: number){

    const response = this.reply_post.get('response_'+id_post).value;
    alert(response)
    // const post_id = this.reply_post.get('post_id').value;
    // const user_id = parseInt(this.auth.getID());
    
    // this.post_service.replyPost(user_id, post_id, response).subscribe(data => {
    //   if(data[0]['status'] === 'success'){
    //     alert("Send")
    //     this.reply_post.get('response').reset('');
    //   }else{
    //     alert("Fail")
    //   }
    // });
  }

  add_refresh(){
    let btn_refresh = document.getElementById("refresh_page");
    setInterval(()=>{
      btn_refresh.setAttribute("class", "btn");
    }, 50000);
  }

  refresh(){
    document.getElementById("page").scrollIntoView(true);
    document.getElementById("refresh_page").setAttribute("class", "btn hidden");
    this.load_all_posts();
  }
}