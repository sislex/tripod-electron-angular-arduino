import { createReducer, on } from '@ngrx/store';

import * as ConfigActions from './config.actions';

export const CONFIG_FEATURE_KEY = 'config';

export interface ConfigState {
  // channelName: string;
}

export interface ConfigPartialState {
  readonly [CONFIG_FEATURE_KEY]: ConfigState;
}

export const initialState: ConfigState = {
  // channelName: '',
};

export const configReducer = createReducer(
  initialState,
  // on(ConfigActions.setChannelName, (state, {channelName}) => ({ ...state, channelName })),
);

