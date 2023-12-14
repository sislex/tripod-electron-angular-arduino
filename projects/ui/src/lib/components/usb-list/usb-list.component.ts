import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IUser } from 'projects/web/src/lib/state/config/config.reducer';

@Component({
  selector: 'usb-list',
  templateUrl: './usb-list.component.html',
  styleUrls: ['./usb-list.component.scss']
})
export class UsbListComponent {
  @Input() usbList: string[] | null = [];
  @Output() emitter = new EventEmitter();

  getUsbList() {
    this.emitter.emit({
      event: 'UsbListComponent:BUTTON_CLICKED',
      data: {message: 'GET_USB_DEVICES'},
    });
  }

  // buttonClicked(user: IUser) {
  //   this.emitter.emit({
  //     event: 'UsbListComponent:BUTTON_CLICKED',
  //     data: {user},
  //   });
  // }
}
