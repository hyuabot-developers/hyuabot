import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'shuttle',
        loadChildren: () => import('../pages/shuttle/shuttle.module').then(m => m.ShuttleModule)
      },
      {
        path: 'bus',
        loadChildren: () => import('../pages/bus/bus.module').then(m => m.BusModule)
      },
      {
        path: 'subway',
        loadChildren: () => import('../pages/subway/subway.module').then(m => m.SubwayPageModule)
      },
      {
        path: 'cafeteria',
        loadChildren: () => import('../pages/cafeteria/cafeteria.module').then(m => m.CafeteriaPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../pages/menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: '',
        redirectTo: '/shuttle',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/shuttle',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
