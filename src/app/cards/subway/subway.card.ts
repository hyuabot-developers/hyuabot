import { Component, Input } from '@angular/core';
import {
  SubwayRealtimeItem,
  SubwayRouteItem,
  SubwayService,
  SubwayTimetableItem
} from '../../pages/subway/subway.service';

interface SubwayRealtimeList {
  up: SubwayRealtimeItem[];
  down: SubwayRealtimeItem[];
}

interface SubwayTimetableList {
  up: SubwayTimetableItem[];
  down: SubwayTimetableItem[];
}

@Component({
  selector: 'app-subway-card',
  templateUrl: 'subway.card.html',
  styleUrls: ['subway.card.scss']
})
export class SubwayCardComponent {
  @Input() subwayRouteItemIndex: number;
  subwayRealtimeItems: SubwayRealtimeList = {up: [], down: []};
  subwayTimetableItems: SubwayTimetableList = {up: [], down: []};
  realtimeDelta : {up: number, down: number} = {up: -1, down: -1};
  routeName: string;
  stationName: string;
  upTimetableURL: string;
  downTimetableURL: string;
  private now: Date = new Date();
  constructor(private subwayService: SubwayService) {
    this.subwayService.subwayArrivalList.subscribe((subwayArrivalList) => {
      if (subwayArrivalList[this.subwayRouteItemIndex] !== undefined) {
        this.routeName = this.getSubwayRouteCode(subwayArrivalList[this.subwayRouteItemIndex]);
        this.stationName = this.getSubwayDestination(subwayArrivalList[this.subwayRouteItemIndex].stationName);
        this.subwayRealtimeItems.up = subwayArrivalList[this.subwayRouteItemIndex].realtime.filter((item) => item.heading === 'up');
        this.subwayRealtimeItems.down = subwayArrivalList[this.subwayRouteItemIndex].realtime.filter((item) => item.heading === 'down');
        if (this.subwayRealtimeItems.up.length > 0) {
          this.realtimeDelta.up = this.subwayRealtimeItems.up[this.subwayRealtimeItems.up.length -1].remainedTime;
        }
        if (this.subwayRealtimeItems.down.length > 0) {
          this.realtimeDelta.down = this.subwayRealtimeItems.down[this.subwayRealtimeItems.down.length -1].remainedTime;
        }

        this.subwayTimetableItems.up = subwayArrivalList[this.subwayRouteItemIndex].timetable.map(this.mapSubwayTimetableItem).filter(
          (item) => item.heading === 'up' && this.getRemainedMinutes(item.departureTime) > this.realtimeDelta.up);
        this.subwayTimetableItems.down = subwayArrivalList[this.subwayRouteItemIndex].timetable.map(this.mapSubwayTimetableItem).filter(
          (item) => item.heading === 'down' && this.getRemainedMinutes(item.departureTime) > this.realtimeDelta.down);
        this.upTimetableURL = '/subway/timetable?route=' + this.routeName + '&station=' + this.stationName + '&heading=up';
        this.downTimetableURL = '/subway/timetable?route=' + this.routeName + '&station=' + this.stationName + '&heading=down';
      }
    });
  }
  getSubwayRouteCode(subwayRouteItem: SubwayRouteItem): string {
    switch (subwayRouteItem.routeName) {
      case '4호선':
        return 'line4';
      case '수인분당선':
        return 'suinbundang';
    }
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
  getRemainedMinutes(departureTime: string): number {
    let [hour, minute] = departureTime.split(':');
    const remainedTime = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), parseInt(hour), parseInt(minute)).getTime() - this.now.getTime();
    return Math.floor(remainedTime / 1000 / 60) - 5;
  }
  mapSubwayTimetableItem(subwayTimetableItem: SubwayTimetableItem): SubwayTimetableItem {
    let departureTime = subwayTimetableItem.departureTime;
    if (subwayTimetableItem.departureTime.startsWith('00:')) {
      departureTime = subwayTimetableItem.departureTime.replace('00:', '24:');
    }
    return {
      departureTime,
      ...subwayTimetableItem,
    };
  }
}
