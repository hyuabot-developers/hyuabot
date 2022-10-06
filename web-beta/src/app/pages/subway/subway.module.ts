import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SubwayPage } from './subway.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { SubwayPageRoutingModule } from './subway-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: SubwayPage }]),
    SubwayPageRoutingModule,
  ],
  declarations: [SubwayPage]
})
export class SubwayPageModule {}
