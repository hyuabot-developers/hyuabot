import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CafeteriaPage } from './cafeteria.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { CafeteriaPageRoutingModule } from './cafeteria-routing.module';
import { CafeteriaCardModule } from '../../cards/cafeteria/cafeteria.card.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{path: '', component: CafeteriaPage}]),
    CafeteriaPageRoutingModule,
    CafeteriaCardModule,
    SwiperModule,
  ],
  declarations: [CafeteriaPage]
})
export class CafeteriaPageModule {}
