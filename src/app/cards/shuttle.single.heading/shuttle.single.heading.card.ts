import { Component, Input } from '@angular/core';
import { ShuttleService, ShuttleTimetableItem } from '../../pages/shuttle/shuttle.service';

@Component({
  selector: 'app-shuttle-single-card',
  templateUrl: 'shuttle.single.heading.card.html',
  styleUrls: ['shuttle.single.heading.card.scss']
})
export class ShuttleSingleHeadingCardComponent {
  @Input() stopName: string;
  @Input() timeDeltaDH: number;
  @Input() timeDeltaDY: number;
  @Input() timeDeltaC: number;
  shuttleTimetableStation: ShuttleTimetableItem[] = [];
  shuttleTimetableTerminal: ShuttleTimetableItem[] = [];
  @Input() firstDestination = 'campus';
  constructor(private shuttleService: ShuttleService) {
    this.shuttleService.shuttleTimetable.subscribe((timetable) => {
      this.shuttleTimetableStation = new Array<ShuttleTimetableItem>();
      this.shuttleTimetableTerminal = new Array<ShuttleTimetableItem>();
      for (const item of timetable.filter((item) => (item.startStop.toLowerCase() === 'dormitory' || this.stopName !== 'dormitory' ))) {
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
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDH)
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
            shuttleTime: this.addTimeDelta(item.shuttleTime, this.timeDeltaDH)
          });
        }
      }
    });
  }

  addTimeDelta(time: string, delta: number): string {
    const [hour, minute] = time.split(':');
    const newTime = new Date(0, 0, 0, parseInt(hour), parseInt(minute) + delta);
    return String(newTime.getHours()).padStart(2, "0") + ":" + String(newTime.getMinutes()).padStart(2, "0");
  }
}
