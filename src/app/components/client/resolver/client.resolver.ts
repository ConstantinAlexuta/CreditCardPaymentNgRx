import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { filter, finalize, first, tap } from 'rxjs/operators';
import { areClientsLoaded } from '../state/client.selectors';
import { loadClients } from '../state/client.actions';
import { AppState } from 'src/store/reducers';

@Injectable()
export class ClientResolver implements Resolve<Observable<any>> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areClientsLoaded),
      tap((clientsLoaded) => {
        console.log('111', clientsLoaded);
        if (!clientsLoaded) {
          this.store.dispatch(loadClients());
        }
      }),
      filter((clientsLoaded) => clientsLoaded),
      first()
    );
  }
}
