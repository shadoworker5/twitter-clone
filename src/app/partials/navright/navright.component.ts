import { Component, OnInit } from '@angular/core';
import { FollowerService } from 'src/app/services/follower.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navright',
  templateUrl: './navright.component.html',
  styleUrls: ['./navright.component.css']
})
export class NavrightComponent implements OnInit {
  public user_list = [];
  etat_dialog = false

  constructor(private follow: FollowerService, private auth: AuthService){ }

  ngOnInit(): void {
    this.loadList();
  }
  
  loadList(){
    const id = parseInt(this.auth.getID());
    this.follow.getUserList(id)
      .subscribe(data => {
        this.user_list = data;
    });
  }

  follow_him(user_id2: number){
    const user_id1 = parseInt(this.auth.getID());
    this.follow.follow(user_id1, user_id2)
      .subscribe(data => {
        if(data[0]['status'] === 'success'){
          this.loadList()
        }
    });
  }

  openDialog(){
    let chat = document.getElementById("chat")
    let chat_replie_hauteur = "30px";
    let chat_etendu_hauteur = "500px";
    let chat_open_time = 500;
    let chat_close_time = 2000;
    
    if(!this.etat_dialog){
      this.etat_dialog = true
      chat.style.height = chat_etendu_hauteur
      this.sendMessage("Hi. I'm Jarvis. What's your name?");
    }else{
      this.etat_dialog = false
      chat.style.height = chat_replie_hauteur
    }
  }

  sendMessage(message: string){
    let chat_content = document.getElementById("chat-content")
    if(!chat_content.hasChildNodes){
      chat_content.innerHTML = ('<br/>');
    }

    chat_content.innerHTML += ('<span class="current_message"> <span class="chat-bot">Jarvis:</span> '+message+'</span>');
    // ++chatMsgCount;
  }

  reply(){
    const response = document.getElementById("message");
    alert(response.innerText)
  }

  ai(message){
    // if(userName.length == 0){
    //     userName = message;
    //     send_message("Ravi de faire ta connaissance "+userName+". Quoi de neuf?");
    // }

    // if(message.indexOf("comment vas tu") >= 0){
    //     send_message("Je vais bien et toi?");
    // }
    
    // if(message.indexOf("passion") >= 0){
    //     send_message("Ma passion c'est programmation car je ne comprend qu du binaire");
    // }
    
    // if(message.indexOf("quel pays") >= 0){
    //     send_message("Je viens du Burkina Faso");
    // }
    
    // if(message.indexOf("heure") >= 0){
    //     send_message("Actuellement il est "+Date('H:i:s')+" dans mon pays");
    // }
    
    // if(message.indexOf("Qui est Kassoum") >= 0){
    //     send_message("Kassoum est celui qui m'a developpe. Il envisage devenir un expert en cyber securite");
    // }
    
    // if(message.indexOf(" ") = 0){
    //     send_message("Je ne comprends pas ce que vous dites!!!!");
    // }
  }
}