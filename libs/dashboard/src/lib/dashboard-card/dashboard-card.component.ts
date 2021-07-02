import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'smitestats-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {

  @Input() title = '';
  @Input() imgUrl = '';
  @Input() route = '';

  constructor(private router: Router) { }

  onClick() {
    this.router.navigate([this.route]);
  }

}
