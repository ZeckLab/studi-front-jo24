import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OffersPageComponent } from './pages/offers/offers.component';
import { SignLogInComponent } from './pages/sign-log-in/sign-log-in.component';

const routes: Routes = [
    { path: 'offers', component: OffersPageComponent },
    { path: 'login', component: SignLogInComponent },
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}