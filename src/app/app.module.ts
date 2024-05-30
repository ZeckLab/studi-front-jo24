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
import { SignLogInComponent } from './pages/sign-log-in/sign-log-in.component';
import { HeaderUserComponent } from "./components/header-user/header-user.component";
import { ModalComponent } from './components/modal/modal.component';
import { RouterLinkActive } from '@angular/router';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';


@NgModule({
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ShoppingCartComponent, SignLogInComponent, RouterLinkActive, HeaderUserComponent, HeaderAdminComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        EventComponent,
        OfferComponent,
        OffersPageComponent,
        ModalComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}