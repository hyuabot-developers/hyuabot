import { Component, Input } from '@angular/core';
import { ShuttleService, ShuttleTimetableItem } from '../../pages/shuttle/shuttle.service';

@Component({
  selector: 'app-shuttle-dual-card',
  templateUrl: 'shuttle.dual.heading.card.html',
  styleUrls: ['shuttle.dual.heading.card.scss']
})
export class ShuttleDualHeadingCardComponent {
  @Input() stopName: string;
  @Input() timeDeltaDH: number;
  @Input() timeDeltaDY: number;
  @Input() timeDeltaC: number;
  shuttleTimetableStation: ShuttleTimetableItem[] = [];
  shuttleTimetableTerminal: ShuttleTimetableItem[] = [];
  constructor(private shuttleService: ShuttleService) {
    this.shuttleService.shuttleTimetable.subscribe((timetable) => {
      this.shuttleTimetableStation = new Array<ShuttleTimetableItem>();
      this.shuttleTimetableTerminal = new Array<ShuttleTimetableItem>();
      for (const item of timetable.filter((item) => (item.startStop === 'dormitory' || this.stopName !== 'dormitory' ))) {
        if (item.shuttleType === 'DH'){
          item.shuttleTime = this.addTimeDelta(item.shuttleTime, this.timeDeltaDH);
          this.shuttleTimetableStation.push(item);
        } else if (item.shuttleType === 'DY'){
          item.shuttleTime = this.addTimeDelta(item.shuttleTime, this.timeDeltaDY);
          this.shuttleTimetableTerminal.push(item);
        } else if (item.shuttleType === 'C'){
          item.shuttleTime = this.addTimeDelta(item.shuttleTime, this.timeDeltaC);
          this.shuttleTimetableStation.push(item);
          this.shuttleTimetableTerminal.push(item);
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
