import {Component, OnDestroy, OnInit} from '@angular/core';
import {IpcService} from '../services/ipc.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tripod-electron-angular-arduino';

  constructor(
    private route: ActivatedRoute,
    private ipcService: IpcService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const channelName = params['channelName'];
      console.log(channelName);
    });


    this.ipcService.on('electron-angular', (event, arg) => {
      console.log(arg); // arg - данные, отправленные из Electron
      // Здесь вы можете выполнить действия на основе полученных данных
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

  onButtonClick() {
    if (this.ipcService.isElectron()) {
      this.ipcService.send('electron-angular', 'Button was clicked!');
    }
  }
}
