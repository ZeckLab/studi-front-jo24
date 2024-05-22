import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OffersPageComponent } from './pages/offers/offers.component';

const routes: Routes = [
    { path: 'offers', component: OffersPageComponent },
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}