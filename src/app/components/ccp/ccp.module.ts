import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CcpRoutingModule } from './ccp-routing.module';
import { CcpDashboardMenuComponent } from './components/ccp-dashboard-menu/ccp-dashboard-menu.component';
import { CcpDashboardComponent } from './components/ccp-dashboard/ccp-dashboard.component';
import { CcpViewAllComponent } from './components/ccp-view-all/ccp-view-all.component';
import { CcpViewOneComponent } from './components/ccp-view-one/ccp-view-one.component';
import { CcpAddOneComponent } from './components/ccp-add-one/ccp-add-one.component';
import { CcpAddMoreComponent } from './components/ccp-add-more/ccp-add-more.component';
import { CcpEditOneComponent } from './components/ccp-edit-one/ccp-edit-one.component';
import { CcpEditMoreComponent } from './components/ccp-edit-more/ccp-edit-more.component';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CcpEffects } from './state/ccp.effects';
import { ccpReducer } from './state/ccp.reducers';
import { CcpService } from './service/ccp.service';

@NgModule({
  declarations: [
    CcpDashboardMenuComponent,
    CcpDashboardComponent,
    CcpViewAllComponent,
    CcpViewOneComponent,
    CcpAddOneComponent,
    CcpAddMoreComponent,
    CcpEditOneComponent,
    CcpEditMoreComponent,
  ],
  imports: [
    CommonModule,
    CcpRoutingModule,
    FormsModule,
    StoreModule.forFeature('ccps', ccpReducer),
    EffectsModule.forFeature([CcpEffects]),
  ],
  providers: [CcpService],
  bootstrap: [],
  exports: [
    CcpDashboardMenuComponent, ////////////
    CcpDashboardComponent,
    CcpViewAllComponent,
    CcpViewOneComponent,
    CcpAddOneComponent,
    CcpAddMoreComponent,
    CcpEditOneComponent,
    CcpEditMoreComponent,
  ],
})
export class CcpModule {}
