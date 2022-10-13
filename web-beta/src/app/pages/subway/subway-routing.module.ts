import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubwayPage } from './subway.page';

const routes: Routes = [
  {
    path: '',
    component: SubwayPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubwayPageRoutingModule {}
