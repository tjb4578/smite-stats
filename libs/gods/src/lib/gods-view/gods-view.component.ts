import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GodsFacade } from '../+state/gods.facade';
import { GodsEntity } from '../+state/gods.models';

@Component({
  selector: 'smitestats-gods-view',
  templateUrl: './gods-view.component.html',
  styleUrls: ['./gods-view.component.scss']
})
export class GodsViewComponent implements OnInit {
  gods$: Observable<GodsEntity[]>;

  constructor(private readonly godsFacade: GodsFacade) {
    this.gods$ = this.godsFacade.allGods$;
   }

  ngOnInit(): void {
    this.godsFacade.loadGods();
  }
}
