import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SubwayRealtimeQuery {
  realtime: SubwayRealtimeItem[];
}

export interface SubwayRealtimeItem {
  heading: string;
  updateTime: string;
  lastTrain: boolean;
  terminalStation: string;
  currentStation: string;
  remainedTime: number;
  status: string;
}

export interface SubwayTimetableItem {
  heading: string;
  weekday: string;
  terminalStation: string;
  departureTime: string;
}

export interface SubwayRouteItem {
  stationName: string;
  routeName: string;
  realtime: SubwayRealtimeItem[];
  timetable: SubwayTimetableItem[];
}

@Injectable()
export class SubwayService {
  weekday: BehaviorSubject<string> = new BehaviorSubject<string>('weekday');
  subwayArrivalList: BehaviorSubject<SubwayRouteItem[]> = new BehaviorSubject<SubwayRouteItem[]>([]);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public setSubwayArrivalList(subwayRouteItems: SubwayRouteItem[]) {
    this.subwayArrivalList.next(subwayRouteItems);
  }
  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }
}

export const subwayServiceInjectables: Array<any> = [
  SubwayService
];
