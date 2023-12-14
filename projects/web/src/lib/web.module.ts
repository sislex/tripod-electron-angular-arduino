import { NgModule } from '@angular/core';
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
import {WebComponent} from './containers/web/web.component';
import {MainComponent} from './containers/main/main.component';
import {NavPanelComponent} from './containers/nav-panel/nav-panel.component';
import {AuthComponent} from './containers/auth/auth.component';
import {ACCOUNT_FEATURE_KEY, accountReducer} from './state/account/account.reducer';
import {AccountEffects} from './state/account/account.effects';
import {UsbListComponent} from './containers/usb-list/usb-list.component';

const state = [
  StoreModule.forRoot({}),
  EffectsModule.forRoot([]),

  StoreModule.forFeature(CONFIG_FEATURE_KEY, configReducer),

  StoreModule.forFeature(ACCOUNT_FEATURE_KEY, accountReducer),
  EffectsModule.forFeature(AccountEffects),

  StoreModule.forFeature(MESSAGES_FEATURE_KEY, messagesReducer),
  EffectsModule.forFeature(MessagesEffects),

  StoreModule.forFeature(USB_FEATURE_KEY, usbReducer),
  EffectsModule.forFeature(UsbEffects),

  StoreDevtoolsModule.instrument(),
];

@NgModule({
  declarations: [
    WebComponent,
    MainComponent,
    NavPanelComponent,
    AuthComponent,
    UsbListComponent,
  ],
  imports: [
    ...state,
    CommonModule,
    UiModule,
  ],
  exports: [
    WebComponent,
  ]
})
export class WebModule { }
