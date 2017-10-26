import {Component, NgZone, ViewChild} from '@angular/core';
import {Content, NavController} from 'ionic-angular';
import {TextToSpeech} from "@ionic-native/text-to-speech";

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: any[] = [];
  text: string = "";

  @ViewChild(Content) content
  constructor(public navCtrl: NavController, private ngZone: NgZone, private tts: TextToSpeech) {
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
      this.content.scrollToBottom(200);

      this.text = "";

      window['ApiAIPlugin'].requestText({
          query: message
      }, (response)=>{

          this.ngZone.run(()=> {
              this.messages.push({
                  text: response.result.fulfillment.speech,
                  sender: "api"
              })
          })
          this.content.scrollToBottom(200);
      }, (error)=>{
          console.log(error);
      },)
  }

  sendVoice(){
      window['ApiAIPlugin'].requestVoice({},
      (response)=>{
        this.tts.speak({
            text: response.result.fulfillment.speech,
            locale: "en-AU",
            rate: 1
        })

      },(err)=>{
        console.log(err);
      })
  }



}
