import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';
import { MenuCardComponent } from '../../cards/menu/menu.card';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, TranslateModule],
    declarations: [
        MenuCardComponent
    ],
    exports: [RouterModule, MenuCardComponent]
})
export class MenuPageRoutingModule {}
