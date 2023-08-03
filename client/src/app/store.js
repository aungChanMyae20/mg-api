import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice'
import eventReducer from '../features/event/eventSlice'
import albumReducer from '../features/album/albumSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  album: albumReducer
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)