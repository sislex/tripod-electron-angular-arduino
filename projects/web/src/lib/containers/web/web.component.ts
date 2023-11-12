import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IpcService} from '../../services/ipc.service';
import {select, Store} from '@ngrx/store';
import {getChannelName} from '../../state/config/config.selectors';
import {getUsbList} from '../../state/usb/usb.selectors';
import {take} from 'rxjs';
import {setUsbList} from '../../state/usb/usb.actions';
import {setChannelName} from '../../state/config/config.actions';

@Component({
  selector: 'lib-web',
  templateUrl: './web.component.html',
  styles: [
  ]
})
export class WebComponent implements OnInit, OnDestroy {
  @Input() channelName: string = '';
  getChannelName$ = this.store.pipe(select(getChannelName));
  getUsbList$ = this.store.pipe(select(getUsbList));

  constructor(
    private readonly store: Store,
    private ipcService: IpcService,
  ) {}

  ngOnInit() {
    this.store.dispatch(setChannelName({ channelName: this.channelName }));

    this.ipcService.on(this.channelName, (event, json) => {
      console.log(json); // arg - данные, отправленные из Electron
      if (json) {
        const jsonObj = JSON.parse(json);
        const event: string = jsonObj.event;
        if (event === 'USB_DEVICES') {
          const usbList = jsonObj.data.map((usb: any) => usb.path);
          this.store.dispatch(setUsbList({ usbList }));
        }
      }
    });
  }

  ngOnDestroy() {
    // Отписываемся от канала 'some-channel', чтобы избежать утечек памяти
    // когда компонент уничтожается
    // this.ipcService.removeListener('electron-angular', this.listener);
  }

  onButtonClick(command: string) {
    if (this.ipcService.isElectron()) {
      if (command === 'GET_USB_DEVICES') {
        this.getChannelName$.pipe(take(1)).subscribe((channelName: string) => {
          const event = 'GET_USB_DEVICES';
          const message = JSON.stringify({event});
          this.ipcService.send(channelName, message);
        });
      }
    }
  }

  private listener(event: any, arg: any) {
    console.log(arg);
    // Дополнительная логика обработки
  }
}
