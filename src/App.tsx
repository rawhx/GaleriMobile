import React, { useEffect, useRef } from 'react';
import Router from './router';
import { AuthProvider } from './context/auth';
import { Alert, BackHandler } from 'react-native';

const App = () => {
  const lastBackPressed = useRef(0);

  useEffect(() => {
    const handleBackButton = () => {
      const currentTime = new Date().getTime();

      if (currentTime - lastBackPressed.current < 2000) {
        Alert.alert(
          'Keluar Aplikasi',
          'Apakah Anda yakin ingin keluar?',
          [
            { text: 'Tidak', style: 'cancel' },
            { text: 'Ya', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
      } else {
        lastBackPressed.current = currentTime;
      }

      return true
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []); 

  return (
    // <AuthProvider>
      <Router />
    // </AuthProvider>
  )
}

export default App;
