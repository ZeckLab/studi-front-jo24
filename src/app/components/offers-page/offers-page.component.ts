import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { OffersService } from '../../services/offers/offers.service';

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrl: '/src/scss/pages/offers-page.scss'
})

export class OffersPageComponent implements OnInit{
  offersArray: Offer[] = [];
  choicesArray: string[] = [];
  @Input() total:number = 0;

  constructor(private offersService: OffersService) {
  }

  ngOnInit(): void {
    this.offersService.getAllVisible().subscribe({
      next: (offers: Offer[]) => {
        this.offersArray = offers;
        console.log(this.offersArray);
      },
      error: (error) => {
        console.error(error);
      }
    });

    console.log(this.choicesArray.length);
  }

  addChoice(choice: string) {
    this.choicesArray.push(choice);
    this.total += parseFloat(choice.split('=')[1]);
  }
}
