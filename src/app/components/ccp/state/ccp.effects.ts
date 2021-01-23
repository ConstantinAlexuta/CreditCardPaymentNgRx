import { ccpActionTypes } from './ccp.actions';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CcpService } from '../service/ccp.service';

@Injectable()
export class CcpEffects {
  ccpsPath: string = '/api/ccps';

  constructor(
    private ccpService: CcpService,
    private actions: Actions,
    private router: Router
  ) {}

  loadCcps = createEffect(() =>
    this.actions.pipe(
      ofType(ccpActionTypes.loadCcps),
      concatMap(() => this.ccpService.getCcps()),
      map((ccps) => ccpActionTypes.ccpsLoaded({ ccps }))
    )
  );

  ////////// >???????????????
  loadCcp = createEffect(() =>
    this.actions.pipe(
      ofType(ccpActionTypes.loadCcp),
      concatMap((action) => this.ccpService.getCcp(action.type)), /// ???????????
      map((ccp) => ccpActionTypes.ccpLoaded({ ccp }))
    )
  );

  createCcp = createEffect(
    () =>
      this.actions.pipe(
        ofType(ccpActionTypes.createCcp),
        concatMap((action) => this.ccpService.createCcp(action.ccp)),
        tap(() => this.router.navigateByUrl(this.ccpsPath))
      ),
    { dispatch: false }
  );

  deleteCcp = createEffect(
    () =>
      this.actions.pipe(
        ofType(ccpActionTypes.deleteCcp),
        concatMap((action) => this.ccpService.deleteCcp(action.ccpId))
      ),
    { dispatch: false }
  );

  updateCcp = createEffect(
    () =>
      this.actions.pipe(
        ofType(ccpActionTypes.updateCcp),
        concatMap((action) =>
          this.ccpService.updateCcp(action.update.id, action.update.changes)
        )
      ),
    { dispatch: false }
  );
}
