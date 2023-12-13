import { createAction, props } from '@ngrx/store';
import {IUser} from '../config/config.reducer';

export const setUser = createAction(
  '[Account] setUser',
  props<{ user: IUser }>()
);
