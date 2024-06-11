import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventComponent } from './components/event/event.component';
import { OfferComponent } from './components/offer/offer.component';
import { OffersPageComponent } from './pages/offers/offers.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { SignLogInComponent } from './pages/sign-log-in/sign-log-in.component';
import { HeaderUserComponent } from "./components/header-user/header-user.component";
import { ModalComponent } from './components/modal/modal.component';
import { RouterLinkActive } from '@angular/router';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { AdminOffersComponent } from './pages/admin-offers/admin-offers.component';


@NgModule({
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ShoppingCartComponent, SignLogInComponent, RouterLinkActive, HeaderUserComponent, HeaderAdminComponent, OfferComponent, AdminOffersComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        EventComponent,
        OffersPageComponent,
        ModalComponent
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        registerLocaleData(fr.default);
    }
}