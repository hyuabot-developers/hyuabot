import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusPage } from './bus.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { BusRoutingModule } from './bus-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { BusCardModule } from '../../cards/bus/bus.card.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    BusRoutingModule,
    TranslateModule,
    SwiperModule,
    BusCardModule
  ],
  declarations: [BusPage]
})
export class BusModule {}
