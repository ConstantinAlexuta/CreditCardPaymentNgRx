import { clientActionTypes } from './client.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Client } from '../model/client.model';
import { createReducer, on } from '@ngrx/store';

export interface ClientState extends EntityState<Client> {
  clientsLoaded: boolean;
}

export const adapter: EntityAdapter<Client> = createEntityAdapter<Client>();

export const initialState = adapter.getInitialState({
  clientsLoaded: false,
});

export const clientReducer = createReducer(
  initialState,

  on(clientActionTypes.clientsLoaded, (state, action) => {
    return adapter.setAll(action.clients, { ...state, clientsLoaded: true });
  }),

  on(clientActionTypes.clientLoaded, (state, action) => {
    return adapter.setOne(action.client, { ...state, clientLoaded: true });
  }),

  on(clientActionTypes.createClient, (state, action) => {
    return adapter.addOne(action.client, state);
  }),

  on(clientActionTypes.deleteClient, (state, action) => {
    return adapter.removeOne(action.clientId + '', state);
  }),

  on(clientActionTypes.updateClient, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
