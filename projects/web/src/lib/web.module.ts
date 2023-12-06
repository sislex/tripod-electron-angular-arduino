import { NgModule } from '@angular/core';
import { WebComponent } from './containers/web/web.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CONFIG_FEATURE_KEY, configReducer} from './state/config/config.reducer';
import {USB_FEATURE_KEY, usbReducer} from './state/usb/usb.reducer';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {UsbEffects} from './state/usb/usb.effects';
import {MESSAGES_FEATURE_KEY, messagesReducer} from './state/messages/messages.reducer';
import {MessagesEffects} from './state/messages/messages.effects';
import {UiModule} from '../../../ui/src/lib/ui.module';

const state = [
  StoreModule.forRoot({}),
  EffectsModule.forRoot([]),
  StoreModule.forFeature(CONFIG_FEATURE_KEY, configReducer),
  StoreModule.forFeature(MESSAGES_FEATURE_KEY, messagesReducer),
  EffectsModule.forFeature(MessagesEffects),
  StoreModule.forFeature(USB_FEATURE_KEY, usbReducer),
  EffectsModule.forFeature(UsbEffects),
  StoreDevtoolsModule.instrument(),
];

@NgModule({
  declarations: [
    WebComponent
  ],
  imports: [
    CommonModule,
    ...state,
    UiModule,
  ],
  exports: [
    WebComponent
  ]
})
export class WebModule { }
