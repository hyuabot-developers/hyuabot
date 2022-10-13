import { Component, Input, OnInit } from '@angular/core';
import { ShuttleService, ShuttleTimetableItem } from '../../pages/shuttle/shuttle.service';
import { min } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { SubwayRealtimeItem } from '../../pages/subway/subway.service';

interface SubwayRealtimeList {
  up: SubwayRealtimeItem[];
  down: SubwayRealtimeItem[];
}

@Component({
  selector: 'app-shuttle-subway-card',
  templateUrl: 'shuttle.subway.card.html',
  styleUrls: ['shuttle.subway.card.scss']
})
export class ShuttleSubwayCardComponent {
  subwayRealtimeItems: SubwayRealtimeList = {up: [], down: []};
  constructor(private shuttleService: ShuttleService) {
    this.shuttleService.subwayRealtime.subscribe((subwayRealtimeItems: SubwayRealtimeItem[]) => {
      this.subwayRealtimeItems.up = subwayRealtimeItems.filter((item: SubwayRealtimeItem) => item.heading === 'up');
      this.subwayRealtimeItems.down = subwayRealtimeItems.filter((item: SubwayRealtimeItem) => item.heading === 'down');
    });
  }
  getLongerRealtimeList(): SubwayRealtimeItem[] {
    return this.subwayRealtimeItems.up.length > this.subwayRealtimeItems.down.length ?
      this.subwayRealtimeItems.up : this.subwayRealtimeItems.down;
  }
}
