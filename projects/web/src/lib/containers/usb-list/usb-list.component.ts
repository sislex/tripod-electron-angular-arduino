import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUsbList} from '../../state/usb/usb.selectors';
import {sendMessage} from '../../state/messages/messages.actions';

@Component({
  selector: 'usb-list-container',
  templateUrl: './usb-list.component.html',
  styleUrls: ['./usb-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsbListComponent {
  getUsbList$ = this.store.pipe(select(getUsbList));

  constructor(
    private readonly store: Store,
  ) {
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'UsbListComponent:BUTTON_CLICKED' && $event.data.message === 'GET_USB_DEVICES') {
      const message = {event: 'GET_USB_DEVICES'};
      this.store.dispatch(sendMessage({message}));
    }
  }
}
