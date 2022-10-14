import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubwayPage } from './subway.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { SubwayRoutingModule } from './subway-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { BusCardModule } from '../../cards/bus/bus.card.module';
import { SubwayCardModule } from '../../cards/subway/subway.card.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SubwayRoutingModule,
    TranslateModule,
    SwiperModule,
    BusCardModule,
    SubwayCardModule
  ],
  declarations: [SubwayPage]
})
export class SubwayModule {}
