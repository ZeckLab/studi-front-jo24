import { Component, OnInit } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { OfferComponent } from '../../components/offer/offer.component';
import { CommonModule } from '@angular/common';
import { OffersService } from '../../services/offers/offers.service';
import { OfferInputComponent } from '../../components/offer-input/offer-input.component';

@Component({
  selector: 'app-admin-offers',
  standalone: true,
  imports: [OfferComponent, CommonModule, OfferInputComponent],
  templateUrl: './admin-offers.component.html',
  styleUrl: '/src/scss/pages/admin-offers.scss'
})
export class AdminOffersComponent implements OnInit{
  offersArray: Offer[] = [];
  newOffer: Offer = new Offer('','',0,0,'');
  
  constructor(private offersService: OffersService) {
  }

  ngOnInit(): void {
    this.offersService.getAll().subscribe({
      next: (offers: Offer[]) => {
        console.log(offers);
        this.offersArray = offers;
        console.log(this.offersArray);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  update($event: Offer){
    this.offersArray.push($event);
  }
}
