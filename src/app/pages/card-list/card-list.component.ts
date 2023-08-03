import { Component, OnInit } from '@angular/core';
import { CardImage } from 'src/app/models/card-image.interface';
import { Card } from 'src/app/models/card.interface';
import { CardsApiService } from 'src/app/services/cards-api.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styles: [
  ]
})
export class CardListComponent implements OnInit {

  cards: Card[] = [];
  meta: object = {};
  loading: boolean = false;

  constructor(private _cardService: CardsApiService) { }

  ngOnInit(): void {
    this.getCards();  
  }

  private getCards() : void {
    this.loading = true;

    this._cardService.getCards().subscribe(
      (res) => {
        this.meta = res.meta;
        this.cards = res.data;
        this.cards.forEach(card => this._cardService.processCardImages(card.card_images));

        this.loading = false;
      },
      (error) => {
        console.log('[ERROR]', error);
        this.loading = false;
      }
    );
  }

}
