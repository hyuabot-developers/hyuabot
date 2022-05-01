// This is just an example,
// so you can safely delete all default props below

export default {
  menu: {
    shuttle: '셔틀버스',
    subway: '전철',
    bus: '버스',
    cafeteria: '학식',
    library: '열람실 좌석 조회',
    calendar: '학사력',
    contact: '전화부',
    language: '언어 설정',
    about: '소개',
    dark_mode: '다크 모드',
    menu: '더보기',
    dark: {
      light: '끄기(주간 모드)',
      dark: '켜기(야간 모드)',
      auto: '자동(시스템)',
    }
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
  subway: {
    timetable: {
      1004: '4호선',
      1075: '수인분당선',
      up: '상행',
      down: '하행',
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
    },
    timetable: {
      'weekdays': '평일',
      'saturday': '토요일',
      'sunday': '일요일',
    }
  },
  cafeteria: {
    'out_of_order': '학식 정보 미제공',
  }
};
