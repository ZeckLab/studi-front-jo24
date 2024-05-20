import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventComponent } from './components/event/event.component';
import { OfferComponent } from './components/offer/offer.component';
import { OffersPageComponent} from './pages/offers/offers.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        EventComponent,
        OfferComponent,
        OffersPageComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ShoppingCartComponent]
})
export class AppModule {
}