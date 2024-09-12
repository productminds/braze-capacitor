import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
declare var BrazePlugin: any;

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

  constructor() {}

  private async fetchContentCards() {
    await BrazePlugin.requestContentCardsRefresh();
    await BrazePlugin.getContentCardsFromCache(
      (data: any) => {
        this.cards = data.map(({ extras, ...item }: any) => ({ ...item, extras: JSON.parse(extras)}));
        console.log(this.cards);
        console.info(
          `Succesfully fetched content cards with: ${this.cards.length} card`
        );
      },
      (err: any) => console.error('Error fetching cards')
    );
  }

  ngOnInit(): void {
    BrazePlugin.changeUser('user-02');

    this.fetchContentCards();
  }
}
