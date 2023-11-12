import {Component, OnDestroy, OnInit} from '@angular/core';
import {IpcService} from './services/ipc.service';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {setChannelName} from './state/config/config.actions';
import {getChannelName} from './state/config/config.selectors';
import {take} from 'rxjs';
import {setUsbList} from './state/usb/usb.actions';
import {getUsbList} from './state/usb/usb.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tripod-electron-angular-arduino';
  getChannelName$ = this.store.pipe(select(getChannelName));
  getUsbList$ = this.store.pipe(select(getUsbList));
  private channelName = '';

  constructor(
    private route: ActivatedRoute,
    private ipcService: IpcService,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const channelName = params['channelName'];
      console.log(channelName);
      if (channelName) {
        this.store.dispatch(setChannelName({ channelName }));
      }

      this.ipcService.on(channelName, (event, json) => {
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
    });
  }

  ngOnDestroy() {
    // Отписываемся от канала 'some-channel', чтобы избежать утечек памяти
    // когда компонент уничтожается
    this.ipcService.removeListener('electron-angular', this.listener);
  }

  private listener(event: any, arg: any) {
    console.log(arg);
    // Дополнительная логика обработки
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
}
