import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';

export const headerRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HeaderBarComponent,
    PageTitleComponent
  ],
  exports: [
    HeaderBarComponent,
    PageTitleComponent
  ]
})
export class HeaderModule {}
