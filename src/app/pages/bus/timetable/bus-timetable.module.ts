import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BusTimetablePage } from './bus-timetable.page';
import { BusTimetableRoutingModule } from './bus-timetable-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    BusTimetableRoutingModule
  ],
  declarations: [BusTimetablePage]
})
export class BusTimetableModule {}
