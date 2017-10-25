import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TextToSpeech} from "@ionic-native/text-to-speech";

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: any[] = [];
  text: string = "";
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
