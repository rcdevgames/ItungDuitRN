import React from 'react';
import {StatusBar} from 'react-native';
import Route from './route';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar translucent barStyle="light-content" />
      <Route/>
    </SafeAreaProvider>
  );
};

export default App;
