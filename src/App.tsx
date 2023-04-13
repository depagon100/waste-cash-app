import 'react-native-gesture-handler';

import React from 'react';
import Geocoder from 'react-native-geocoding';
import { ReduxNetworkProvider } from 'react-native-offline';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as io from 'socket.io-client';

import { ScreenLoading } from '@/components/screens/ScreenLoading/ScreenLoading';
import SocketProvider from '@/components/SocketContext';
import ContainerNavigation from '@/containers/ContainerNavigation';
import { persistor, store } from '@/state/store';
import ThemeProvider from '@/theme/ThemeProvider';

import { websocket } from './config';

const App: React.FC = () => {
  const socket = io.connect(websocket);

  Geocoder.init('AIzaSyBNxWWbvboL9bLF7NAPysYvYP54xuNFVec', { language: 'en' });

  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={<ScreenLoading />} persistor={persistor}>
          <SocketProvider.Provider value={{ socket }}>
            <ContainerNavigation />
          </SocketProvider.Provider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
