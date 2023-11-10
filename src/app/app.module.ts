import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {CONFIG_FEATURE_KEY, configReducer} from './state/config/config.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {USB_FEATURE_KEY, usbReducer} from './state/usb/usb.reducer';

const state = [
  StoreModule.forRoot({}),
  StoreModule.forFeature(CONFIG_FEATURE_KEY, configReducer),
  StoreModule.forFeature(USB_FEATURE_KEY, usbReducer),
  StoreDevtoolsModule.instrument(),
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    ...state,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
