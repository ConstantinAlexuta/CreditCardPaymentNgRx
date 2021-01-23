import { ClientService } from '../service/client.service';
import {
  clientActionTypes,
  loadClients,
  createClient,
  updateClient,
} from './client.actions';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ClientEffects {
  clientsPath: string = '/api/clients';

  constructor(
    private clientService: ClientService,
    private actions: Actions,
    private router: Router
  ) {}

  loadClients = createEffect(() =>
    this.actions.pipe(
      ofType(clientActionTypes.loadClients),
      concatMap(() => this.clientService.getClients()),
      map((clients) => clientActionTypes.clientsLoaded({ clients }))
    )
  );

  ////////// >???????????????
  loadClient = createEffect(() =>
    this.actions.pipe(
      ofType(clientActionTypes.loadClient),
      concatMap((action) => this.clientService.getClient(action.type)), /// ???????????
      map((client) => clientActionTypes.clientLoaded({ client }))
    )
  );

  createClient = createEffect(
    () =>
      this.actions.pipe(
        ofType(clientActionTypes.createClient),
        concatMap((action) => this.clientService.createClient(action.client)),
        tap(() => this.router.navigateByUrl(this.clientsPath))
      ),
    { dispatch: false }
  );

  deleteClient = createEffect(
    () =>
      this.actions.pipe(
        ofType(clientActionTypes.deleteClient),
        concatMap((action) => this.clientService.deleteClient(action.clientId))
      ),
    { dispatch: false }
  );

  updateClient = createEffect(
    () =>
      this.actions.pipe(
        ofType(clientActionTypes.updateClient),
        concatMap((action) =>
          this.clientService.updateClient(
            action.update.id,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );
}
