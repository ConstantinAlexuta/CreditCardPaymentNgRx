import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { filter, finalize, first, tap } from 'rxjs/operators';
import { AppState } from 'src/store/reducers';
import { areCcpsLoaded } from '../state/ccp.selectors';
import { loadCcps } from '../state/ccp.actions';

@Injectable()
export class CcpResolver implements Resolve<Observable<any>> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areCcpsLoaded),
      tap((ccpsLoaded) => {
        console.log('111', ccpsLoaded);
        if (!ccpsLoaded) {
          this.store.dispatch(loadCcps());
        }
      }),
      filter((ccpsLoaded) => ccpsLoaded),
      first()
    );
  }
}
