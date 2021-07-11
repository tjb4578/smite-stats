import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardModule, dashboardRoutes } from '@smitestats/dashboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule, headerRoutes } from '@smitestats/header';
import { GodsModule, godsRoutes } from '@smitestats/gods';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'dashboard', children: dashboardRoutes },
      { path: 'header', children: headerRoutes },
      { path: 'gods', children: godsRoutes },
    ]),
    DashboardModule,
    BrowserAnimationsModule,
    HeaderModule,
    GodsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
