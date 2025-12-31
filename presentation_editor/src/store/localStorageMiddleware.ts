import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { saveToLocalStorage } from './localStorage';

export const localStorageMiddleware: Middleware<unknown, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  saveToLocalStorage(state.editor.present);

  return result;
};