import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { localStorageMiddleware } from './localStorageMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
