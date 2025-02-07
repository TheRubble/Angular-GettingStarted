import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { ProductListComponent } from "./products/product-list.component";
import { ConvertToSpacesPipe } from "./shared/pipes/convert-to-spaces";
import { StarComponent } from "./shared/star.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductDetailComponent } from './products/details/product-detail.component';
import { WelcomeComponent } from "./home/welcome.component";
import {ProductDetailGuard} from "./products/details/product-detail-guard";


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products', component : ProductListComponent },
      {
        path: 'products/:id',
        canActivate : [ProductDetailGuard],
        component : ProductDetailComponent },
      { path: 'welcome', component : WelcomeComponent },
      { path: '', redirectTo : "welcome", pathMatch: "full" }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
