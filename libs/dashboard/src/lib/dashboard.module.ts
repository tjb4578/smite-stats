import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { MatCardModule } from '@angular/material/card';

export const dashboardRoutes: Route[] = [
  { path: '', component: DashboardViewComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule, MatCardModule],
  declarations: [
    DashboardViewComponent,
    DashboardCardComponent
  ],
  exports: [
    DashboardViewComponent,
    DashboardCardComponent
  ]
})
export class DashboardModule {}
