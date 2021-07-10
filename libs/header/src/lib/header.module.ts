import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeaderBarComponent } from './header-bar/header-bar.component';

export const headerRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HeaderBarComponent
  ],
  exports: [
    HeaderBarComponent
  ]
})
export class HeaderModule {}
