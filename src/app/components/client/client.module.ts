import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ClientService } from './service/client.service';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ClientEffects } from './state/client.effects';
import { clientReducer } from './state/client.reducers';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  declarations: [ClientsListComponent, CreateClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    StoreModule.forFeature('clients', clientReducer),
    EffectsModule.forFeature([ClientEffects]),
  ],
  providers: [ClientService],
  bootstrap: [],
  exports: [ClientsListComponent, CreateClientComponent],
})
export class ClientModule {}
