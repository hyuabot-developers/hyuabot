import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MenuPage } from './menu.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { MenuPageRoutingModule } from './menu-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: MenuPage }]),
    MenuPageRoutingModule,
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
