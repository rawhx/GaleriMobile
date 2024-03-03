import React, { useEffect, useRef } from 'react';
import Router from './router';
import { Alert, BackHandler, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { CommonActions, NavigationContainer } from '@react-navigation/native';

const App = () => {
  const lastBackPressed = useRef(0);

  useEffect(() => {
    const checkAndRequestPermissions = async () => {
      // Memeriksa izin kamera
      const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);
      // Memeriksa izin penyimpanan file
      const storagePermission = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

      // Minta izin kamera jika belum diberikan
      if (cameraPermission !== RESULTS.GRANTED) {
        const cameraPermissionResult = await request(PERMISSIONS.ANDROID.CAMERA);
        // Tampilkan pesan jika izin kamera diberikan atau ditolak
        if (cameraPermissionResult !== RESULTS.GRANTED) {
          Alert.alert(
            'Peringatan',
            'Izin kamera dibutuhkan untuk menggunakan fitur tertentu dalam aplikasi ini.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        }
      }

      // Minta izin penyimpanan file jika belum diberikan
      if (storagePermission !== RESULTS.GRANTED) {
        const storagePermissionResult = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        // Tampilkan pesan jika izin penyimpanan file diberikan atau ditolak
        if (storagePermissionResult !== RESULTS.GRANTED) {
          Alert.alert(
            'Peringatan',
            'Izin penyimpanan file dibutuhkan untuk menggunakan fitur tertentu dalam aplikasi ini.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        } 
      }
    };

    checkAndRequestPermissions();

    const handleBackButton = () => {
      const currentTime = new Date().getTime();

      if (currentTime - lastBackPressed.current < 1000) {
        // Klik dua kali: Keluar dari aplikasi
        BackHandler.exitApp();
        return true;
      } else if (currentTime - lastBackPressed.current < 2000) {
        // Klik pertama: Tampilkan pesan "Klik lagi untuk keluar aplikasi!"
        ToastAndroid.show('Klik lagi untuk keluar aplikasi!', ToastAndroid.SHORT);
        lastBackPressed.current = currentTime;
        return true;
      }
      // Klik ketiga (atau lebih): Lakukan tindakan "back"
      lastBackPressed.current = currentTime;
      return true; // Mengizinkan tindakan back seperti biasa
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Router />
    </KeyboardAvoidingView>
  );
};

export default App;
