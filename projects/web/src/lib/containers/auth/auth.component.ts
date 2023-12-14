import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUserList} from '../../state/config/config.selectors';
import {setAndSaveUser, setUser} from '../../state/account/account.actions';

@Component({
  selector: 'auth-container',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  getUserList$ = this.store.pipe(select(getUserList));


  constructor(
    private readonly store: Store,
  ) {
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'UserListComponent:BUTTON_CLICKED') {
      this.store.dispatch(setAndSaveUser({user: $event.data.user}));
    }
  }
}
