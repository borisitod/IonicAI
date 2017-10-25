import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: any[] = [];
  text: string = "";
  constructor(public navCtrl: NavController) {
      this.messages.push({
          text: 'Hi, how can I help you',
          sender: 'api'
      })
  }

  sendText(){

      let message = this.text;

      this.messages.push({
        text: message,
        sender: 'me'
      })

      this.text = "";

      window['ApiAIPlugin'].requestText({
          query: message
      }, (response)=>{
          this.messages.push({
              text: response.result.fullfilment.speech,
              sender: "api"
          })
      }, (error)=>{
          alert(JSON.stringify(error))
      },)
  }


}
