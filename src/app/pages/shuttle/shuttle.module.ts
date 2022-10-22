import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ShuttlePage } from './shuttle.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ShuttleRoutingModule } from './shuttle-routing.module';
import {ShuttleDualHeadingCardModule} from "../../cards/shuttle.dual.heading/shuttle.dual.heading.card.module";
import { ShuttleSingleHeadingCardModule } from '../../cards/shuttle.single.heading/shuttle.single.heading.card.module';
import { SwiperModule } from 'swiper/angular';
import { ShuttleSubwayCardModule } from '../../cards/shuttle.subway/shuttle.subway.card.module';
import { BirthdayCardComponent } from '../../cards/birthday/birthday.card';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        ExploreContainerComponentModule,
        ShuttleRoutingModule,
        ShuttleDualHeadingCardModule,
        ShuttleSingleHeadingCardModule,
        SwiperModule,
        ShuttleSubwayCardModule
    ],
    declarations: [ShuttlePage, BirthdayCardComponent]
})
export class ShuttleModule {}
