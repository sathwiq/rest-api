import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { ItemsComponent } from './menu/items/items.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
   {path: '', redirectTo: '/home', pathMatch: 'full'},
   {path: 'home', component: MenuComponent, children: [
     {path: 'items/:a', component: ItemsComponent}
    ]},
   {path: 'order', component: OrderComponent,canActivate:[AuthGuard]},
   {path: 'cart', component: CartComponent ,canActivate:[AuthGuard]},
   { path: 'login/:i', component: LoginComponent },
   { path: 'signup/:id', component: SignupComponent },
   { path: '**', redirectTo: '/home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
