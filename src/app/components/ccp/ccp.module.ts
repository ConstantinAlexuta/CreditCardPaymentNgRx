import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcpViewAllComponent } from './ccp-view-all/ccp-view-all.component';
import { CcpViewOneComponent } from './ccp-view-one/ccp-view-one.component';
import { CcpAddOneComponent } from './ccp-add-one/ccp-add-one.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdDatepickerAdapter } from './datepicker-adapter';

@NgModule({
  declarations: [
    CcpViewAllComponent,
    CcpViewOneComponent,
    CcpAddOneComponent,
    NgbdDatepickerAdapter,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'credit-card-payment/new', component: CcpAddOneComponent },

      { path: 'credit-card-payment/:id', component: CcpViewOneComponent },
      { path: 'credit-card-payment', component: CcpViewAllComponent },
    ]),
  ],
  exports: [
    CcpViewAllComponent,
    CcpViewOneComponent,
    CcpAddOneComponent,
    NgbdDatepickerAdapter,
  ],
})
export class CcpModule {}
