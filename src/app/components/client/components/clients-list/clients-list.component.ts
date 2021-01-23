import { getClients } from './../../state/client.selectors';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client.model';
import { Store } from '@ngrx/store';
import { clientActionTypes } from '../../state/client.actions';
import { Update } from '@ngrx/entity';
import { AppState } from 'src/store/reducers';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
})
export class ClientsListComponent implements OnInit {
  clients!: Observable<Client[]>;

  clientToBeUpdated!: Client | null;

  isUpdateActivated: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.clients = this.store.select(getClients);
  }

  deleteClient(clientId: string | number) {
    this.store.dispatch(clientActionTypes.deleteClient({ clientId }));
  }

  showUpdateClientForm(client: Client) {
    this.clientToBeUpdated = { ...client };
    this.isUpdateActivated = true;
  }

  updateClient(updateClientForm: any) {
    const update: Update<Client> = {
      id: this.clientToBeUpdated!.id,
      changes: {
        ...this.clientToBeUpdated,
        ...updateClientForm.value,
      },
    };

    this.store.dispatch(clientActionTypes.updateClient({ update }));

    this.isUpdateActivated = false;

    this.clientToBeUpdated = null;
  }
}
