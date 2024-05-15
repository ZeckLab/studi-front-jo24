import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersPageComponent } from './components/offers-page/offers-page.component';

const routes: Routes = [
    { path: 'offers', component: OffersPageComponent },
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}