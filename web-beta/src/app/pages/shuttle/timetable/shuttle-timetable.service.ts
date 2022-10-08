import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

export interface ShuttleTimetableItem {
  period: string;
  startStop: string;
  shuttleTime: string;
  shuttleType: string;
}

@Injectable()
export class ShuttleTimetableService {
  period: BehaviorSubject<string> = new BehaviorSubject<string>('semester');
  weekday: BehaviorSubject<string> = new BehaviorSubject<string>('weekday');
  shuttleTimetable: BehaviorSubject<ShuttleTimetableItem[]> = new BehaviorSubject<ShuttleTimetableItem[]>([]);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public setShuttleTimetable(timetable: ShuttleTimetableItem[]) {
    this.shuttleTimetable.next(timetable);
  }
  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }
}

export const shuttleTimetableServiceInjectables: Array<any> = [
  ShuttleTimetableService
];
