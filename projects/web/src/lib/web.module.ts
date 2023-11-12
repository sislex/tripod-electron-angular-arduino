import { NgModule } from '@angular/core';
import { WebComponent } from './containers/web/web.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CONFIG_FEATURE_KEY, configReducer} from './state/config/config.reducer';
import {USB_FEATURE_KEY, usbReducer} from './state/usb/usb.reducer';
import {CommonModule} from '@angular/common';

const state = [
  StoreModule.forRoot({}),
  StoreModule.forFeature(CONFIG_FEATURE_KEY, configReducer),
  StoreModule.forFeature(USB_FEATURE_KEY, usbReducer),
  StoreDevtoolsModule.instrument(),
];

@NgModule({
  declarations: [
    WebComponent
  ],
  imports: [
    CommonModule,
    ...state,
  ],
  exports: [
    WebComponent
  ]
})
export class WebModule { }
