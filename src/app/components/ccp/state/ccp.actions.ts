import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Ccp } from '../model/ccp.model';

export const loadCcps = createAction('[Ccps List] Load Ccps via Service');

export const loadCcp = createAction(
  '[Ccps List Operations] Load Ccp via Service'
);

export const ccpsLoaded = createAction(
  '[Ccps Effect] Ccps Loaded Successfully',
  props<{ ccps: Ccp[] }>()
);

export const ccpLoaded = createAction(
  '[Ccp Effect] Ccp Loaded Successfully',
  props<{ ccp: Ccp }>()
);

export const createCcp = createAction(
  '[Create Ccp Component] Create Ccp',
  props<{ ccp: Ccp }>()
);

export const deleteCcp = createAction(
  '[Ccps List Operations] Delete Ccp',
  props<{ ccpId: string | number }>()
);

export const updateCcp = createAction(
  '[Ccps List Operations] Update Ccp',
  props<{ update: Update<Ccp> }>()
);

export const ccpActionTypes = {
  loadCcps,
  loadCcp,
  ccpsLoaded,
  ccpLoaded,
  createCcp,
  deleteCcp,
  updateCcp,
};
