import { Component, Input, OnInit } from '@angular/core';
import { ShuttleService, ShuttleTimetableItem } from '../../pages/shuttle/shuttle.service';

@Component({
  selector: 'app-shuttle-dual-card',
  templateUrl: 'shuttle.dual.heading.card.html',
  styleUrls: ['shuttle.dual.heading.card.scss']
})
export class ShuttleDualHeadingCardComponent {
  @Input() stopName: string;
  @Input() firstDestination = 'station';
  @Input() secondDestination = 'terminal';
  @Input() timeDeltaDH = -5;
  @Input() timeDeltaDY = -5;
  @Input() timeDeltaC = -5;
  shuttleTimetableStation: ShuttleTimetableItem[] = [];
  shuttleTimetableTerminal: ShuttleTimetableItem[] = [];
  constructor(private shuttleService: ShuttleService) {
    this.shuttleService.shuttleTimetable.subscribe((timetable) => {
      this.shuttleTimetableStation = new Array<ShuttleTimetableItem>();
      this.shuttleTimetableTerminal = new Array<ShuttleTimetableItem>();
      for (const item of timetable.filter(
        (shuttleItem) => (shuttleItem.startStop.toLowerCase() === 'dormitory' || this.stopName !== 'dormitory' ))) {
        if (item.shuttleType === 'DH'){
          this.shuttleTimetableStation.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDH)
          });
        } else if (item.shuttleType === 'DY'){
          this.shuttleTimetableTerminal.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDY)
          });
        } else if (item.shuttleType === 'C'){
          this.shuttleTimetableStation.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDH)
          });
          this.shuttleTimetableTerminal.push({
            period: item.period,
            shuttleType: item.shuttleType,
            startStop: item.startStop,
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDY)
          });
        }
      }
    });
  }

  addTimeDelta(time: string, delta: number): string {
    const [hour, minute, second] = time.split(':');
    const newTime = new Date(2022, 10, 29, parseInt(hour, 10), parseInt(minute, 10) + delta);
    return String(newTime.getHours()).padStart(2, '0') + ':' + String(newTime.getMinutes()).padStart(2, '0');
  }
}
