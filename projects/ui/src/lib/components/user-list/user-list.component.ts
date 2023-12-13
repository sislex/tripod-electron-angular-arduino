import {Component, Input} from '@angular/core';

interface IUser {id: number, name: string, role: string};

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: IUser[] = [];
}
