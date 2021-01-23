import { createAction, props } from '@ngrx/store';
import { Client } from '../model/client.model';
import { Update } from '@ngrx/entity';

export const loadClients = createAction(
  '[Clients List] Load Clients via Service'
);

export const loadClient = createAction(
  '[Clients List Operations] Load Client via Service'
);

export const clientsLoaded = createAction(
  '[Clients Effect] Clients Loaded Successfully',
  props<{ clients: Client[] }>()
);

export const clientLoaded = createAction(
  '[Client Effect] Client Loaded Successfully',
  props<{ client: Client }>()
);

export const createClient = createAction(
  '[Create Client Component] Create Client',
  props<{ client: Client }>()
);

export const deleteClient = createAction(
  '[Clients List Operations] Delete Client',
  props<{ clientId: string | number }>()
);

export const updateClient = createAction(
  '[Clients List Operations] Update Client',
  props<{ update: Update<Client> }>()
);

export const clientActionTypes = {
  loadClients,
  loadClient,
  clientsLoaded,
  clientLoaded,
  createClient,
  deleteClient,
  updateClient,
};
