import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventComponent } from './components/event/event.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        EventComponent,
        ],
    
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}