import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShuttleDualHeadingCardComponent } from './shuttle.dual.heading.card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [
    ShuttleDualHeadingCardComponent
  ],
  declarations: [ShuttleDualHeadingCardComponent]
})
export class ShuttleDualHeadingCardModule {}
