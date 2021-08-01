import { Component, OnInit } from '@angular/core';
import { GodsFacade } from '../+state/gods.facade';

@Component({
  selector: 'smitestats-gods-view',
  templateUrl: './gods-view.component.html',
  styleUrls: ['./gods-view.component.scss']
})
export class GodsViewComponent implements OnInit {
  gods$ = this.godsFacade.allGods$;
  latestGod$ = this.godsFacade.latestGod$;

  constructor(private readonly godsFacade: GodsFacade) { }

  ngOnInit(): void {
    this.godsFacade.loadGods();
  }
}
