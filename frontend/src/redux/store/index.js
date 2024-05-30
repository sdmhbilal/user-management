import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import users from '../users';

const persistConfig = {
  key: 'root',
  storage
};

const reducers = combineReducers({
  users
});

const rootReducer = (state, action) => reducers(state, action);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: () => [thunk, logger],
  devTools: true
});
