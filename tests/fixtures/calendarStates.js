export const events = [
  {
    id: '1',
    start: new Date('2022-10-26 13:00:00'),
    end: new Date('2022-10-26 15:00:00'),
    title: 'Cumpleaños de Eduardo',
    notes: 'Alguna nota',
  },
  {
    id: '2',
    start: new Date('2022-07-09 13:00:00'),
    end: new Date('2022-07-09 15:00:00'),
    title: 'Cumpleaños de Marisela',
    notes: 'Alguna nota de Marisela',
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
