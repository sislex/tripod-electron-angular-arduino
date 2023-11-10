import { createAction, props } from '@ngrx/store';

export const setUsbList = createAction(
  '[Usb] setUsbList',
  props<{ usbList: string[] }>()
);
