import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusTimetablePage } from './bus-timetable.page';

const routes: Routes = [
  {
    path: '',
    component: BusTimetablePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusTimetableRoutingModule {}
