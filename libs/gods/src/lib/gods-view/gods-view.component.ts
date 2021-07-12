import { Component, OnInit } from '@angular/core';
import { GodsService } from '../services/gods.service';

@Component({
  selector: 'smitestats-gods-view',
  templateUrl: './gods-view.component.html',
  styleUrls: ['./gods-view.component.scss']
})
export class GodsViewComponent implements OnInit {

  constructor(private service: GodsService) { }

  ngOnInit(): void {
  }

  callService() {
    this.service.getGods();
  }

  pingService() {
    this.service.ping();
  }

  testService() {
    this.service.testSession();
  }

  testSample() {
    this.service.testSample();
  }
}
