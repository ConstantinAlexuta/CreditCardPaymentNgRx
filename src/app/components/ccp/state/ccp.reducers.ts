import { ccpActionTypes } from './ccp.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Ccp } from '../model/ccp.model';
import { createReducer, on } from '@ngrx/store';

export interface CcpState extends EntityState<Ccp> {
  ccpsLoaded: boolean;
}

export const adapter: EntityAdapter<Ccp> = createEntityAdapter<Ccp>();

export const initialState = adapter.getInitialState({
  ccpsLoaded: false,
});

export const ccpReducer = createReducer(
  initialState,

  on(ccpActionTypes.ccpsLoaded, (state, action) => {
    return adapter.setAll(action.ccps, { ...state, ccpsLoaded: true });
  }),

  on(ccpActionTypes.ccpLoaded, (state, action) => {
    return adapter.setOne(action.ccp, { ...state, ccpLoaded: true });
  }),

  on(ccpActionTypes.createCcp, (state, action) => {
    return adapter.addOne(action.ccp, state);
  }),

  on(ccpActionTypes.deleteCcp, (state, action) => {
    return adapter.removeOne(action.ccpId + '', state);
  }),

  on(ccpActionTypes.updateCcp, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
