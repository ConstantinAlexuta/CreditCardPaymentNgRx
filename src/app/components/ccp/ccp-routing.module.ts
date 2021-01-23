import { CcpViewAllComponent } from './components/ccp-view-all/ccp-view-all.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcpResolver } from './resolver/ccp.resolver';
import { CcpAddOneComponent } from './components/ccp-add-one/ccp-add-one.component';

const routes: Routes = [
  {
    path: 'ccp-add-one',
    component: CcpAddOneComponent,
  },
  {
    path: 'ccps',
    component: CcpViewAllComponent,
    resolve: { ccps: CcpResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CcpRoutingModule {}
