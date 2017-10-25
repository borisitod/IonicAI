import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    window['ApiAIPlugin'].init(
        {
            clientAccessToken: "ad585e9a3f714b559fabd009f7df7c5c", // insert your client access key here
            lang: "en" // set lang tag from list of supported languages
        },
        function(result) {
         console.log('ok')
        },
        function(error) { alert(error) }
    );
  }
}

