import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShuttleSubwayCardComponent } from './shuttle.subway.card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [
    ShuttleSubwayCardComponent
  ],
  declarations: [ShuttleSubwayCardComponent]
})
export class ShuttleSubwayCardModule {}
