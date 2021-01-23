import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientState, selectAll } from './client.reducers';

export const clientFeatureSelector = createFeatureSelector<ClientState>(
  'clients'
);

export const getClients = createSelector(clientFeatureSelector, selectAll);

export const areClientsLoaded = createSelector(
  clientFeatureSelector,
  (state) => state.clientsLoaded
);
