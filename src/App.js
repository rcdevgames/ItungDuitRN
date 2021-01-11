import React, { useEffect, useRef } from 'react';
import {StatusBar} from 'react-native';
import Route from './route';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from "react-native-fast-toast";
import globalStore from './Data/global';

const App = () => {
  const toastRef = useRef(null);

  useEffect(() => {
    globalStore.setToastRef(toastRef);
  }, [globalStore]);

  return (
    <SafeAreaProvider>
      <StatusBar translucent barStyle="light-content" />
      <Route/>
      <Toast ref={toastRef} />
    </SafeAreaProvider>
  );
};

export default App;
