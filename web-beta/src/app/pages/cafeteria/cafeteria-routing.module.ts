import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CafeteriaPage } from './cafeteria.page';

const routes: Routes = [
  {
    path: '',
    component: CafeteriaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeteriaPageRoutingModule {}
