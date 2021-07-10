import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodsViewComponent } from './gods-view.component';

describe('GodsViewComponent', () => {
  let component: GodsViewComponent;
  let fixture: ComponentFixture<GodsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GodsViewComponent ]
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
