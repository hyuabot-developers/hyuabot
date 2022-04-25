export interface ShuttleTimetableItem {
  stopCode: string;
  stopName: string;
  weekdays: ShuttleTimetableDay;
  weekends: ShuttleTimetableDay;
}

export interface ShuttleStopItem {
  stopCode: string;
  stopName: string;
  busForStation: ShuttleDepartureItem[];
  busForTerminal: ShuttleDepartureItem[];
}

export interface ShuttleTimetableDay {
  busForStation: ShuttleDepartureItem[];
  busForTerminal: ShuttleDepartureItem[];
}

export interface ShuttleDepartureItem {
  time: string;
  type: string;
}
