export default {
  menu: {
    shuttle: 'Shuttle',
    subway: 'Subway',
    bus: 'Bus',
    cafeteria: 'Cafe',
    library: 'Reading Room',
    calendar: 'Calendar',
    contact: 'Contact',
    language: 'Language',
    about: 'About',
    dark_mode: 'Dark Mode',
    menu: 'Menu',
    dark: {
      light: 'OFF(Light)',
      dark: 'ON(Dark)',
      auto: 'AUTO(System)',
    }
  },
  shuttle: {
    Dormitory: 'Dormitory',
    Shuttlecock_O: 'Shuttlecock',
    Station: 'Station',
    Terminal: 'Terminal',
    Shuttlecock_I: 'Opposite of Shuttlecock',
    heading: {
      Dormitory_Station: 'Station',
      Dormitory_Terminal: 'Terminal',
      Station: 'Station',
      Terminal: 'Terminal',
      Campus: 'Campus',
      Shuttlecock_Dormitory: 'Dormitory',
    },
    timetable: {
      Dormitory: {
        busForStation: 'Dormitory → Station',
        busForTerminal: 'Dormitory → Terminal',
      },
      Shuttlecock_O: {
        busForStation: 'Shuttlecock → Station',
        busForTerminal: 'Shuttlecock → Terminal',
      },
      Station: {
        busForStation: 'Station → Campus',
        busForTerminal: 'Station → Terminal',
      },
      Terminal: {
        busForStation: 'Terminal → Campus',
        busForTerminal: 'Terminal → Campus',
      },
      Shuttlecock_I: {
        busForStation: 'Shuttlecock → Dormitory',
        busForTerminal: 'Shuttlecock → Dormitory',
      },
      weekdays: 'Weekdays',
      weekends: 'Weekends',
      departureTime: 'Departure Time',
    },
    more: 'Click to see all timetable',
  },
  bus: {
    waitingStartStop: 'Waiting at start stop',
    '10-1': {
      'terminalStop': 'Sangnoksu Stn',
    },
    '707-1': {
      'terminalStop': 'Suwon Stn',
    },
    '3102': {
      'terminalStop': 'Gangnam Stn',
    }
  }
};
