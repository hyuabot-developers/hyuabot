export interface SubwayItem {
  lineName: string;
  updateTime: Date;
  realtime: SubwayRealtimeList;
  timetable: SubwayTimetableList;
}

export interface SubwayRealtimeList {
  up: SubwayRealtimeItem[];
  down: SubwayRealtimeItem[];
}

export interface SubwayTimetableList {
  up: SubwayTimetableItem[];
  down: SubwayTimetableItem[];
}

export interface SubwayRealtimeItem {
  trainNumber: string,
  updateTime: string,
  isLastTrain: boolean,
  terminalStation: string,
  currentStation: string,
  remainedTime: number,
  statusCode: string
}

export interface SubwayTimetableItem {
  terminalStation: string;
  departureTime: string;
}
