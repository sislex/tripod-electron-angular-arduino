import { NgModule } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {PageLayoutComponent} from './layouts/page-layout/page-layout.component';
import {PagesLayoutComponent} from './layouts/pages-layout/pages-layout.component';
import {NavPanelComponent} from './components/nav-panel/nav-panel.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { UserListComponent } from './components/user-list/user-list.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    PagesLayoutComponent,
    PageLayoutComponent,
    NavPanelComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
  ],
  exports: [
    PagesLayoutComponent,
    PageLayoutComponent,
    NavPanelComponent,
    UserListComponent,
  ]
})
export class UiModule { }
