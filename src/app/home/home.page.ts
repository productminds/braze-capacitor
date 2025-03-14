import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

declare var BrazePlugin: any;

declare global {
  interface Window {
    app: any;
  }
}

window.app = window.app || {}; // Initialize the app object globally

// Now you can add methods to the app object
window.app.inAppMessageReceived = function (message: string) {
  const parsedJson = JSON.parse(message);
  console.log("In-App Message received:", parsedJson);
  console.log("Inapp", parsedJson.extras);
};

window.app.inAppMessageClicked = function (message: string, button?: string, uri?: string) {
  console.log("Entered", message, button, uri);
  const parsedJson = JSON.parse(message);
  console.log("Entered2", message, button, uri);

  console.log("Clicked!!", parsedJson);
  // Optional: On IOS
  console.log("Clicked button!", uri);
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NgForOf, NgIf],
})
export class HomePage implements OnInit {
  title = 'Hi, Minder';
  cards: any[] = [];

  constructor(private platform: Platform) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.initializeBraze();
      }, 1000); // Slight delay (500ms) before initiali zing Braze
    });
  }

  initializeBraze() {
    // Ensure deviceready is fired and web view is initialized
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false
    );
  }

  onDeviceReady() {
    this.subscribeToInAppMessages();
    // this.addInAppMessageListener();
    BrazePlugin.changeUser('user-02');
  }

  subscribeToInAppMessages() {
    if (BrazePlugin) {
      BrazePlugin.subscribeToInAppMessage(true);
      BrazePlugin.subscribeToInAppMessageClicks(true);
    }
  }

  handleInAppMessage(message: any) {
    console.log('Handling In-App Message:', message);
  }
}
