import { combineReducers } from '@reduxjs/toolkit';
import editorReducer from './editorSlice';

const rootReducer = combineReducers({
  editor: editorReducer,
});

export default rootReducer;