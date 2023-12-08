import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUsbList} from '../../state/usb/usb.selectors';

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
}
