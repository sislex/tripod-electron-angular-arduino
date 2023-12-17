import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUsbList} from '../../state/usb/usb.selectors';
import {sendMessage, setChannelNameAndSubscribe} from '../../state/messages/messages.actions';
import {isUserLogin} from '../../state/account/account.selectors';
import {getUserFromLocalStorage} from '../../state/account/account.actions';
import {IUsb} from '../../state/usb/usb.reducer';

@Component({
  selector: 'web',
  templateUrl: './web.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponent implements OnInit {
  @Input() channelName: string = '';
  isUserLogin$ = this.store.pipe(select(isUserLogin));
  getUsbList$ = this.store.pipe(select(getUsbList));

  constructor(
    private readonly store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    this.store.dispatch(getUserFromLocalStorage());
    this.getUsbList$.subscribe((usbList: IUsb[]) => {
      // Когда шлю данные в usbList, то они не отображаются в шаблоне, пока не вызову detectChanges()
      setTimeout(() => {this.cdr.detectChanges();}, 0);
    });
  }

  ngOnInit() {
    this.store.dispatch(setChannelNameAndSubscribe({ channelName: this.channelName }));
  }

  onButtonClick(command: string) {
    const message = {event: 'GET_USB_DEVICES'};
    this.store.dispatch(sendMessage({message}));
  }
}
