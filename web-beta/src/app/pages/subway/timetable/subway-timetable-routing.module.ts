import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubwayTimetablePage } from './subway-timetable.page';

const routes: Routes = [
  {
    path: '',
    component: SubwayTimetablePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubwayTimetableRoutingModule {}
