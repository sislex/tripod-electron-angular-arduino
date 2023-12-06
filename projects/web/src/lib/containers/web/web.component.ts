import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUsbList} from '../../state/usb/usb.selectors';
import {sendMessage, setChannelNameAndSubscribe} from '../../state/messages/messages.actions';

@Component({
  selector: 'lib-web',
  templateUrl: './web.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponent implements OnInit {
  @Input() channelName: string = '';
  getUsbList$ = this.store.pipe(select(getUsbList));

  constructor(
    private readonly store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    this.getUsbList$.subscribe((usbList: string[]) => {
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