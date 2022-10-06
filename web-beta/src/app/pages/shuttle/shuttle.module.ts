import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ShuttlePage } from './shuttle.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ShuttleRoutingModule } from './shuttle-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ExploreContainerComponentModule,
    ShuttleRoutingModule
  ],
  declarations: [ShuttlePage]
})
export class ShuttleModule {}