import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

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
  public setShuttleTimetable(timetable: ShuttleTimetableItem[]) {
    this.shuttleTimetable.next(timetable);
  }
}

export const shuttleServiceInjectables: Array<any> = [
  ShuttleService
];
