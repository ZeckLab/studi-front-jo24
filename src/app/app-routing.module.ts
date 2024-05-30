import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OffersPageComponent } from './pages/offers/offers.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';

const routes: Routes = [
    { path: 'admin/offers', component: UnderConstructionComponent},
    { path: 'admin/events', component: UnderConstructionComponent},
    { path: 'admin/orders', component: UnderConstructionComponent},
    { path: 'admin/staffs', component: UnderConstructionComponent},
    { path: 'admin', component: AdminHomeComponent},
    { path: 'offers', component: OffersPageComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'profile', component: UnderConstructionComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}