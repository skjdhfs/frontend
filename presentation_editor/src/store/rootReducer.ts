import { combineReducers } from '@reduxjs/toolkit';
import editorReducer from './editorSlice';
import authReducer from './authSlice'

const rootReducer = combineReducers({
  editor: editorReducer,
  auth: authReducer,
});

export default rootReducer;