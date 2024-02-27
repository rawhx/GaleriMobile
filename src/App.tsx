import React, { useEffect, useRef } from 'react';
import Router from './router';
import { AuthProvider } from './context/auth';
import { Alert, BackHandler, KeyboardAvoidingView, Platform, TextInput, ToastAndroid } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const lastBackPressed = useRef(0);

  useEffect(() => {
    const lastBackPressed = { current: 0 };
  
    const handleBackButton = () => {
      const currentTime = new Date().getTime();
  
      if (currentTime - lastBackPressed.current < 2000) {
        // Klik dua kali: Tampilkan pesan "Klik lagi untuk keluar aplikasi!"
        ToastAndroid.show('Klik lagi untuk keluar aplikasi!', ToastAndroid.SHORT);
      } else if (currentTime - lastBackPressed.current < 3000) {
        // Klik tiga kali: Keluar dari aplikasi
        BackHandler.exitApp();
      } else if (currentTime - lastBackPressed.current < 3000) {
        // Klik tiga kali: Keluar dari aplikasi
        BackHandler.exitApp();
      } else {
        // Klik pertama: Lakukan tindakan "back"
        lastBackPressed.current = currentTime;
      }
  
      return true;
    };
  
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  

  return (
    // <AuthProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        // keyboardVerticalOffset={60}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Router />
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
    // </AuthProvider>
  )
}

export default App;
