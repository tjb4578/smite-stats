import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GodsViewComponent } from './gods-view/gods-view.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGods from './+state/gods.reducer';
import { GodsEffects } from './+state/gods.effects';
import { GodsFacade } from './+state/gods.facade';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '@smitestats/header';

export const godsRoutes: Route[] = [{ path: '', component: GodsViewComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HeaderModule,
    StoreModule.forFeature(fromGods.GODS_FEATURE_KEY, fromGods.reducer),
    EffectsModule.forFeature([GodsEffects]),
  ],
  declarations: [GodsViewComponent],
  exports: [GodsViewComponent],
  providers: [GodsFacade],
})
export class GodsModule {}
