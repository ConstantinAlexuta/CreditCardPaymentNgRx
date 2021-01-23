import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CcpState, selectAll } from './ccp.reducers';

export const ccpFeatureSelector = createFeatureSelector<CcpState>('ccps');

export const getCcps = createSelector(ccpFeatureSelector, selectAll);

export const areCcpsLoaded = createSelector(
  ccpFeatureSelector,
  (state) => state.ccpsLoaded
);
