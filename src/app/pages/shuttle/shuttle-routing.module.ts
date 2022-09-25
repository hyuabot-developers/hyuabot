import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShuttlePage } from './shuttle.page';

const routes: Routes = [
  {
    path: '',
    component: ShuttlePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShuttleRoutingModule {}
