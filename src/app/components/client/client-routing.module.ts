import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientResolver } from './resolver/client.resolver';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { CreateClientComponent } from './components/create-client/create-client.component';

const routes: Routes = [
  {
    path: 'clients',
    component: ClientsListComponent,
    resolve: { clients: ClientResolver },
  },
  {
    path: 'create-client',
    component: CreateClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
