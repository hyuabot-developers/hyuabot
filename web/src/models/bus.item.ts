export interface BusItem {
  name: string;
  startStop: string;
  terminalStop: string;
  timeFromStateStop: number;
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
  weekends: string[];
}
