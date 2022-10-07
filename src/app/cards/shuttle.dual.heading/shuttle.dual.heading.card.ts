import { Component, Input, OnInit } from '@angular/core';
import { ShuttleService, ShuttleTimetableItem } from '../../pages/shuttle/shuttle.service';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-shuttle-dual-card',
  templateUrl: 'shuttle.dual.heading.card.html',
  styleUrls: ['shuttle.dual.heading.card.scss']
})
export class ShuttleDualHeadingCardComponent {
  @Input() stopName: string;
  @Input() firstDestination = 'station';
  @Input() secondDestination = 'terminal';
  @Input() timeDeltaDH = '-5';
  @Input() timeDeltaDY = '-5';
  @Input() timeDeltaC = '-5';
  shuttleTimetableStation: ShuttleTimetableItem[] = [];
  shuttleTimetableTerminal: ShuttleTimetableItem[] = [];
  constructor(private shuttleService: ShuttleService) {
    this.shuttleService.shuttleTimetable.subscribe((timetable) => {
      let now = new Date();
      this.shuttleTimetableStation = new Array<ShuttleTimetableItem>();
      this.shuttleTimetableTerminal = new Array<ShuttleTimetableItem>();
      for (const item of timetable.filter(
        (shuttleItem) => (shuttleItem.startStop.toLowerCase() === 'dormitory' || this.stopName !== 'dormitory' ))) {
        if (item.shuttleType === 'DH'){
          this.shuttleTimetableStation.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDH, now)
          });
        } else if (item.shuttleType === 'DY'){
          this.shuttleTimetableTerminal.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDY, now)
          });
        } else if (item.shuttleType === 'C'){
          this.shuttleTimetableStation.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaC, now)
          });
          this.shuttleTimetableTerminal.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaC, now)
          });
        }
      }
      this.shuttleTimetableStation = this.shuttleTimetableStation.filter((item) => this.compareShuttleTime(item, now)).sort(this.compareTime);
      this.shuttleTimetableTerminal = this.shuttleTimetableTerminal.filter((item) => this.compareShuttleTime(item, now)).sort(this.compareTime);
    });
  }

  addTimeDelta(time: string, delta: string, now: Date): string {
    const [hour, minute, second] = time.split(':');
    const newTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hour, 10), parseInt(minute, 10));
    newTime.setMinutes(newTime.getMinutes() + parseInt(delta, 10));
    return String(newTime.getHours()).padStart(2, '0') + ':' + String(newTime.getMinutes()).padStart(2, '0');
  }

  compareTime(item1: ShuttleTimetableItem, item2: ShuttleTimetableItem): number {
    if (item1.shuttleTime < item2.shuttleTime) {
      return -1;
    } else if (item1.shuttleTime > item2.shuttleTime) {
      return 1;
    } else {
      return 0;
    }
  }

  compareShuttleTime(item: ShuttleTimetableItem, now: Date): boolean {
    let hour, minute;
    [hour, minute] = item.shuttleTime.split(':');
    return parseInt(hour, 10) > now.getHours() || (parseInt(hour, 10) === now.getHours() && parseInt(minute, 10) >= now.getMinutes());
  }
}
