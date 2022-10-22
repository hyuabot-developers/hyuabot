import { Component } from '@angular/core';
import { ShuttleService } from '../../pages/shuttle/shuttle.service';
import { SubwayRealtimeItem } from '../../pages/subway/subway.service';
import { TranslateService } from '@ngx-translate/core';

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
  constructor(private shuttleService: ShuttleService, private translateService: TranslateService) {
    this.shuttleService.subwayRealtime.subscribe((subwayRealtimeItems: SubwayRealtimeItem[]) => {
      this.subwayRealtimeItems.up = subwayRealtimeItems.filter((item: SubwayRealtimeItem) => item.heading === 'up');
      this.subwayRealtimeItems.down = subwayRealtimeItems.filter((item: SubwayRealtimeItem) => item.heading === 'down');
    });
  }
  getLongerRealtimeList(): SubwayRealtimeItem[] {
    return this.subwayRealtimeItems.up.length > this.subwayRealtimeItems.down.length ?
      this.subwayRealtimeItems.up : this.subwayRealtimeItems.down;
  }
  getSubwayDestination(destination: string): string {
    switch (destination) {
      case '신인천':
      case '인천':
        return 'incheon';
      case '오이도':
        return 'oido';
      case '안산':
        return 'ansan';
      case '고색':
        return 'gosaek';
      case '죽전':
        return 'jukjeon';
      case '왕십리':
        return 'wangsimni';
      case '청량리':
        return 'cheongnyangni';
      case '당고개':
        return 'danggogae';
      case '노원':
        return 'nowon';
      case '한성대':
        return 'hansung';
      case '서울역':
        return 'seoul';
      case '사당':
        return 'sadang';
      case '금정':
        return 'geumjeong';
      default:
        return destination;
    }
  }
  getTerminalName(terminal: string): string {
    return this.translateService.instant('subway.destination.' + this.getSubwayDestination(terminal));
  }
}
