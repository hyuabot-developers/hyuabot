export interface SubwayRealtimeQuery {
  realtime: SubwayRealtimeItem[];
}

export interface SubwayRealtimeItem {
  heading: string;
  terminalStation: string;
  remainedTime: string;
}
