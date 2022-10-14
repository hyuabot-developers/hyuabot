import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubwayCardComponent } from './subway.card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [
    SubwayCardComponent
  ],
  declarations: [SubwayCardComponent]
})
export class SubwayCardModule {}
