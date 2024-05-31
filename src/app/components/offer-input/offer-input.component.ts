import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Offer } from '../../models/offer.model';
import { CommonModule } from '@angular/common';
import { OffersService } from '../../services/offers/offers.service';

@Component({
  selector: 'app-offer-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './offer-input.component.html',
  styleUrl: '/src/scss/components/offer-input.scss'
})
export class OfferInputComponent {
  @Input() offer!: Offer;
  @Input() mode: string = 'view';
  @Output() offerAdded = new EventEmitter<Offer>();
  offerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private offersService: OffersService) {
    this.offerForm = this.formBuilder.group({
      title: [null],
      description: [null],
      price: [null],
      nb_people: [null],
      image_url: [null],
      visible: [null],
      offer_id: [null],
    });
  }

  get form() { return this.offerForm.controls; }

  clearAllValidators() {
    this.offerForm.controls['title'].clearValidators();
    this.offerForm.controls['description'].clearValidators();
    this.offerForm.controls['price'].clearValidators();
    this.offerForm.controls['nb_people'].clearValidators();
    this.offerForm.controls['image_url'].clearValidators();
    this.offerForm.updateValueAndValidity();
  }

  // Admin management
  editOffer() {
    this.mode = 'edit';
    if (this.offer.offer_id != null) {
      this.offerForm.controls['title'].setValue(this.offer.title);
      this.offerForm.controls['description'].setValue(this.offer.description);
      this.offerForm.controls['price'].setValue(this.offer.price);
      this.offerForm.controls['nb_people'].setValue(this.offer.nb_people);
      this.offerForm.controls['image_url'].setValue(this.offer.image_url);
      this.offerForm.controls['visible'].setValue(this.offer.visible);
      this.offerForm.controls['offer_id'].setValue(this.offer.offer_id);
    }

    this.offerForm.controls['title'].setValidators([Validators.required]);
    this.offerForm.controls['description'].setValidators([Validators.required, Validators.minLength(10)]);
    this.offerForm.controls['price'].setValidators([Validators.required, Validators.min(1)]);
    this.offerForm.controls['nb_people'].setValidators([Validators.required, Validators.min(1)]);
    this.offerForm.controls['image_url'].setValidators([Validators.required]);
    this.offerForm.updateValueAndValidity();
  }

  checkTitleOffer() {
    let titleChanged = this.offerForm.controls['title'].value != this.offer.title;

    if (titleChanged) {
      this.offersService.getByTitle(this.offerForm.controls['title'].value).subscribe({
        next: result => {
          if (result) {
            alert('Ce titre existe déjà pour une autre offre. Veuillez en choisir un autre.');
          }
          else {
            this.saveOffer();
          }
        }
        ,
        error: (error) => {
          console.error(error);
        }
      });
    }
    else {
      this.saveOffer();
    }
  }

  saveOffer() {
    let new_offer = { ...this.offer, ...this.offerForm.value }; // merge offer and offerForm
    if (new_offer.offer_id == null || new_offer.offer_id == 0) {
      new_offer.offer_id = null;
      this.addOffer(new_offer);
    } else {
      this.updateOffer(new_offer);
    }
  }

  updateOffer(offer: Offer) {
    this.offersService.update(offer).subscribe({
      next: (offer: Offer) => {
        this.offer = offer;
        this.mode = 'view';
        this.offerForm.reset();
        this.clearAllValidators();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  addOffer(offer: Offer) {
    this.offersService.add(offer).subscribe({
      next: (offer: Offer) => {
        this.offer = offer;
        this.mode = 'view';
        this.offerForm.reset();
        this.offerAdded.emit(offer);
        this.offer = new Offer('', '', 0, 0, '');
        this.clearAllValidators();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  toggleVisibleOffer() {
    let id = this.offer.offer_id;
    if (id != null) {
      this.offersService.toggleVisible(id, this.offer.visible).subscribe({
        next: (offer: Offer) => {
          this.offer.visible = offer.visible;
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }
}
