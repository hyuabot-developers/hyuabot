// This is just an example,
// so you can safely delete all default props below

export default {
  menu: {
    shuttle: '셔틀버스',
    subway: '전철',
    bus: '버스',
    cafeteria: '학식',
    library: '열람실 좌석 조회',
    menu: '더보기',
  },
  shuttle: {
    Dormitory: '기숙사',
    Shuttlecock_O: '셔틀콕',
    Station: '한대앞',
    Terminal: '예술인',
    Shuttlecock_I: '셔틀콕 건너편',
    heading: {
      Dormitory_Station: '셔틀콕/한대앞',
      Dormitory_Terminal: '셔틀콕/예술인',
      Station: '한대앞',
      Terminal: '예술인',
      Campus: '셔틀콕/기숙사',
      Shuttlecock_Dormitory: '기숙사',
    },
    timetable: {
      Dormitory: {
        busForStation: '기숙사 → 셔틀콕/한대앞',
        busForTerminal: '기숙사 → 셔틀콕/예술인',
      },
      Shuttlecock_O: {
        busForStation: '셔틀콕 → 한대앞',
        busForTerminal: '셔틀콕 → 예술인',
      },
      Station: {
        busForStation: '한대앞 → 셔틀콕/기숙사',
        busForTerminal: '한대앞 → 예술인',
      },
      Terminal: {
        busForStation: '예술인 → 셔틀콕/기숙사',
        busForTerminal: '예술인 → 셔틀콕/기숙사',
      },
      Shuttlecock_I: {
        busForStation: '셔틀콕 → 기숙사',
        busForTerminal: '셔틀콕 → 기숙사',
      },
      weekdays: '평일',
      weekends: '주말',
      departureTime: '각 정류소 출발 시간',
    },
    more: '전체 시간표 보기',
  },
  bus: {
    waitingStartStop: '회차점 대기',
    '10-1': {
      'terminalStop': '상록수역',
    },
    '707-1': {
      'terminalStop': '수원역',
    },
    '3102': {
      'terminalStop': '강남역',
    }
  }
};
