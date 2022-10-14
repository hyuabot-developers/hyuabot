import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusCardComponent } from './bus.card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [
    BusCardComponent
  ],
  declarations: [BusCardComponent]
})
export class BusCardModule {}
