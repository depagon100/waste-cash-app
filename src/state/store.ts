import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as network } from 'react-native-offline';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { appSlice } from './app';
import { bidderSetupSlice } from './bidderSetup';
import { categorySlice } from './category';
import { conversationSlice } from './conversation';
import { mapSlice } from './map';
import { notificationSlice } from './notification';
import { productSlice } from './product';
import { productOfferSlice } from './productOffer';
import { productReview } from './review';
import { shopSlice } from './shop';
import { userSlice } from './user';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const authPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  app: appSlice.reducer,
  bidderSetup: bidderSetupSlice.reducer,
  category: categorySlice.reducer,
  conversation: conversationSlice.reducer,
  // network,
  map: mapSlice.reducer,
  notification: notificationSlice.reducer,
  product: productSlice.reducer,
  productOffer: productOfferSlice.reducer,
  productReview: productReview.reducer,
  shop: shopSlice.reducer,
  user: persistReducer(authPersistConfig, userSlice.reducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
