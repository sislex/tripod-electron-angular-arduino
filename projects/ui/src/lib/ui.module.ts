import { NgModule } from '@angular/core';
import { UiComponent } from './components/ui/ui.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    UiComponent
  ],
  imports: [
    MatSlideToggleModule
  ],
  exports: [
    UiComponent
  ]
})
export class UiModule { }
