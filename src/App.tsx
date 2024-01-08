import React from 'react';
import { Text, View } from 'react-native';
import Router from './router';
import { NavigationContainer } from '@react-navigation/native';
import { Welcome } from './pages';
const App = () => {
  return (
    <NavigationContainer>
      {/* <Welcome/> */}
      <Router />
    </NavigationContainer>
  )
}

export default App;
