export interface BusItem {
  name: string;
  startStop: string;
  terminalStop: string;
  timeFromStartStop: string;
  busStop: string;
  realtime: BusRealtimeItem[];
  timetable: BusTimetableItem;
}

export interface BusRealtimeItem {
  location: number;
  lowPlate: boolean;
  remainedTime: number;
  remainedSeat: number;
}

export interface BusTimetableItem {
  weekdays: string[];
  saturday: string[];
  sunday: string[];
}
