import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { SubwayRealtimeItem } from '../subway/subway.service';

export interface ShuttleTimetableItem {
  period: string;
  startStop: string;
  shuttleTime: string;
  shuttleType: string;
}

@Injectable()
export class ShuttleService {
  period: BehaviorSubject<string> = new BehaviorSubject<string>('semester');
  weekday: BehaviorSubject<string> = new BehaviorSubject<string>('weekday');
  shuttleTimetable: BehaviorSubject<ShuttleTimetableItem[]> = new BehaviorSubject<ShuttleTimetableItem[]>([]);
  subwayRealtime: BehaviorSubject<SubwayRealtimeItem[]> = new BehaviorSubject<SubwayRealtimeItem[]>([]);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public setShuttleTimetable(timetable: ShuttleTimetableItem[]) {
    this.shuttleTimetable.next(timetable);
  }
  public setSubwayRealtime(realtimeList: SubwayRealtimeItem[]) {
    this.subwayRealtime.next(realtimeList);
  }
  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }
}

export const shuttleServiceInjectables: Array<any> = [
  ShuttleService
];
