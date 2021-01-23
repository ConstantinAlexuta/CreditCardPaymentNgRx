import { CcpViewAllDashboardComponent } from './components/ccp-view-all-dashboard/ccp-view-all-dashboard.component';
import { CcpViewAllComponent } from './components/ccp-view-all/ccp-view-all.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcpResolver } from './resolver/ccp.resolver';
import { CcpAddOneComponent } from './components/ccp-add-one/ccp-add-one.component';
import { CcpAddMoreComponent } from './components/ccp-add-more/ccp-add-more.component';
import { CcpEditMoreComponent } from './components/ccp-edit-more/ccp-edit-more.component';
import { CcpEditOneComponent } from './components/ccp-edit-one/ccp-edit-one.component';
import { CcpViewOneDashboardComponent } from './components/ccp-view-one-dashboard/ccp-view-one-dashboard.component';
import { CcpViewOneComponent } from './components/ccp-view-one/ccp-view-one.component';

const routes: Routes = [
  // {
  //   path: 'ccp-add-one',
  //   component: CcpAddOneComponent,
  // },
  // {
  //   path: 'ccps',
  //   component: CcpViewAllComponent,
  //   resolve: { ccps: CcpResolver },
  // },

  {
    path: 'ccps',
    component: CcpViewAllDashboardComponent,
    // redirectTo: 'destination-categories-view-all',
    children: [
      {
        path: '',
        redirectTo: 'view-all',
        pathMatch: 'full',
        // loadChildren: () =>
      },
      {
        path: 'add-more',
        component: CcpAddMoreComponent,
        data: { title: 'Add more' },
      },
      {
        path: 'add-one',
        component: CcpAddOneComponent,
        data: { title: 'Add one' },
      },
      {
        path: 'view-all',
        component: CcpViewAllComponent,
        resolve: { ccps: CcpResolver },
        data: { title: 'View all' },
      },
      {
        path: 'view-one/:id',
        component: CcpViewOneDashboardComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full',
          },
          {
            path: 'view',
            component: CcpViewOneComponent,
            data: { title: 'View item' },
          },
          {
            path: 'next/:id',
            component: CcpViewOneComponent,
            data: { title: 'Next item' },
          },
          {
            path: 'edit',
            component: CcpEditOneComponent,
            data: { title: 'Edit item' },
          },
        ],
      },
      {
        path: 'edit-more',
        component: CcpEditMoreComponent,
        data: { title: 'Edit more' },
      },

      // {
      //   path: 'edit-one/:id',
      //   component: CcpEditOneComponent
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CcpRoutingModule {}
