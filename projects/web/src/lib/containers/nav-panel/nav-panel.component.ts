import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUsbList} from '../../state/usb/usb.selectors';
import {resetUser, resetUserFromLocalStorageAndState, setAndSaveUser} from '../../state/account/account.actions';

@Component({
  selector: 'nav-panel-container',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavPanelComponent {
  getUsbList$ = this.store.pipe(select(getUsbList));

  constructor(
    private readonly store: Store,
  ) {
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'NavPanelComponent:BUTTON_CLICKED' && $event.data.note === 'Sign out') {
      this.store.dispatch(resetUserFromLocalStorageAndState());
    }
  }
}
