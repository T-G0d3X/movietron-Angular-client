import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//  HttpClientModule is a simplified API for Angular applications that makes it possible for the client app to communicate with the API or server-side
import { HttpClientModule } from '@angular/common/http';

// after import add HttpClientModule here so you can use the Angular HttpClient module in your application
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
