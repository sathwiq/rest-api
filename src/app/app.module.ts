import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { SlidingMenuComponent } from './sliding-menu/sliding-menu.component';
import { MenuComponent } from './menu/menu.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import {MatIconModule} from '@angular/material/icon';
import { SponsorComponent } from './sponsor/sponsor.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatProgressSpinnerModule, MatRippleModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GetsponserComponent } from './sponsor/getsponser/getsponser.component';
import { ItemsComponent } from './menu/items/items.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SlidingMenuComponent,
    MenuComponent,
    MenuItemComponent,
    OrderComponent,
    CartComponent,
    SponsorComponent,
    GetsponserComponent,
    ItemsComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatRippleModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
