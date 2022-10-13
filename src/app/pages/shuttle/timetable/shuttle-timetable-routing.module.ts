import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShuttleTimetablePage } from './shuttle-timetable.page';

const routes: Routes = [
  {
    path: '',
    component: ShuttleTimetablePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShuttleTimetableRoutingModule {}
