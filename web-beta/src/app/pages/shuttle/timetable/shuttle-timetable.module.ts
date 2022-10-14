import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ShuttleTimetablePage } from './shuttle-timetable.page';
import { ShuttleTimetableRoutingModule } from './shuttle-timetable-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ShuttleTimetableRoutingModule
  ],
  declarations: [ShuttleTimetablePage]
})
export class ShuttleTimetableModule {}
