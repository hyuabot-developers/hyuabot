import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShuttleSingleHeadingCardComponent } from './shuttle.single.heading.card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [
    ShuttleSingleHeadingCardComponent
  ],
  declarations: [ShuttleSingleHeadingCardComponent]
})
export class ShuttleSingleHeadingCardModule {}
