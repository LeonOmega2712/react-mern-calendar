import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice } from './';

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
  // configuracion para evitar que intente serializar objetos de fecha
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
