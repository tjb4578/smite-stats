import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { GodsFacade } from '../+state/gods.facade';

import { GodsViewComponent } from './gods-view.component';

describe('GodsViewComponent', () => {
  let component: GodsViewComponent;
  let fixture: ComponentFixture<GodsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GodsViewComponent ],
      providers: [GodsFacade, Store]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GodsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
