import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GodsViewComponent } from './gods-view/gods-view.component';

export const godsRoutes: Route[] = [
  { path: '', component: GodsViewComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    GodsViewComponent
  ],
  exports: [
    GodsViewComponent
  ]
})
export class GodsModule {}
