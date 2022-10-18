import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeteriaCardComponent } from './cafeteria.card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [
    CafeteriaCardComponent
  ],
  declarations: [CafeteriaCardComponent]
})
export class CafeteriaCardModule {}
