import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';

import { DashboardViewComponent } from './dashboard-view.component';

describe('DashboardViewComponent', () => {
  let component: DashboardViewComponent;
  let fixture: ComponentFixture<DashboardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), MatCardModule],
      declarations: [ DashboardViewComponent, DashboardCardComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dashboard cards', () => {
    const godsCard = '[data-automation="gods-dashboard-card"]';
    const playersCard = '[data-automation="players-dashboard-card"]';
    const splCard = '[data-automation="spl-dashboard-card"]';
    const matchesCard = '[data-automation="matches-dashboard-card"]';
    const buildsCard = '[data-automation="builds-dashboard-card"]';
    const guidesCard = '[data-automation="guides-dashboard-card"]';

    expect(fixture.nativeElement.querySelector(godsCard)).toBeTruthy();
    expect(fixture.nativeElement.querySelector(playersCard)).toBeTruthy();
    expect(fixture.nativeElement.querySelector(splCard)).toBeTruthy();
    expect(fixture.nativeElement.querySelector(matchesCard)).toBeTruthy();
    expect(fixture.nativeElement.querySelector(buildsCard)).toBeTruthy();
    expect(fixture.nativeElement.querySelector(guidesCard)).toBeTruthy();

 
  })
});
