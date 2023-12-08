import { NgModule } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {PageLayoutComponent} from './layouts/page-layout/page-layout.component';
import {PagesLayoutComponent} from './layouts/pages-layout/pages-layout.component';
import {NavPanelComponent} from './components/nav-panel/nav-panel.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    PagesLayoutComponent,
    PageLayoutComponent,
    NavPanelComponent,
  ],
  imports: [
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    PagesLayoutComponent,
    PageLayoutComponent,
    NavPanelComponent,
  ]
})
export class UiModule { }
