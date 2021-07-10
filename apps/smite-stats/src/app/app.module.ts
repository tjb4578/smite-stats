import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardModule, dashboardRoutes } from '@smitestats/dashboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule, headerRoutes } from '@smitestats/header';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'dashboard', children: dashboardRoutes },
      { path: 'header', children: headerRoutes },
    ]),
    DashboardModule,
    BrowserAnimationsModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
