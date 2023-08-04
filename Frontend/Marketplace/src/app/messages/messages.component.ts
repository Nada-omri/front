import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { Message } from '../shared/models/Message';
import { Conversation } from '../shared/models/Conversation';
import { API_URLS } from '../config/api.url.config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  conversations!: Conversation[];

  conversationId!:number;
  activeConversation!: Conversation;
  activeConversationRole!:string;

  Url:string =API_URLS.USER_IMAGE_URL;
  conversationRoles:string[]=[];
  constructor(private webSocketService: WebSocketService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.conversationId = params['id'];
    });  
    this.getconversation();
    this.webSocketService.subscribeToConversation(this.conversationId).subscribe((message:Message)=>{
      this.activeConversation.messages?.push(message);
    })
  }

  getconversation() {
    this.webSocketService.getConversationByUser().subscribe({
      next: (res: any) => {
        this.conversations = res;
        var username=localStorage.getItem("username");
        res.map((con:Conversation)=>{
          if(con.buyer?.username==username){
            this.conversationRoles.push("BUYER")
          }else{
            this.conversationRoles.push("SELLER")
          }
          if(con.id==this.conversationId){
            this.activeConversation=con;
            if(con.buyer?.username==username){
              this.activeConversationRole="BUYER"
            }else{
              this.activeConversationRole="SELLER"
            }
          }
        })
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  getImage(conversation:Conversation,i:number){
    var role= this.conversationRoles[i]=='BUYER'? "BUYER":"SELLER"
    return role=="BUYER"? this.Url+conversation.seller?.image:this.Url+conversation.buyer?.image
  }
  getUsername(conversation:Conversation,i:number){
    var role= this.conversationRoles[i]=='BUYER'? "BUYER":"SELLER"
    return role=="BUYER"? conversation.seller?.username:conversation.buyer?.username
  }
  onSendMessage() {
    const message = 
    {
      body:`test`,
      conversation:{id:this.conversationId},
      sender:this.activeConversationRole
    };
    this.webSocketService.sendMessage(JSON.stringify(message));
  }


}

