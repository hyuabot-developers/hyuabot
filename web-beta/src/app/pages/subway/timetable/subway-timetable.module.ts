import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SubwayTimetablePage } from './subway-timetable.page';
import { SubwayTimetableRoutingModule } from './subway-timetable-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    SubwayTimetableRoutingModule
  ],
  declarations: [SubwayTimetablePage]
})
export class SubwayTimetableModule {}
