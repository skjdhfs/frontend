import { createAsyncThunk } from '@reduxjs/toolkit';
import { account } from '../lib/appwrite';
import type { Models } from 'appwrite';
import { ID } from 'appwrite';
import type {LoginData} from './types'
import { logoutLocal } from './authSlice';

export const loginUser = createAsyncThunk<Models.User<Models.Preferences>, LoginData>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await account.createEmailPasswordSession({email, password});
      const user = await account.get();
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  }
);

export const checkAuthStatus = createAsyncThunk<Models.User<Models.Preferences>, void>(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      return await account.get();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Сессия не найдена');
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await account.deleteSession({sessionId: 'current'});
      dispatch(logoutLocal());
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ошибка при выходе');
    }
  }
);

export const registerUser = createAsyncThunk<Models.User<Models.Preferences>, LoginData>(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await account.create({
        userId: ID.unique(), 
        email, 
        password,
      });

      await account.createEmailPasswordSession({email, password});

      return await account.get();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ошибка при регистрации');
    }
  }
);
