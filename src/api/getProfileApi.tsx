import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';
import { banned } from './banned';

export const getProfile = async () => {
  try {
    // Get the JWT token from AsyncStorage
    const jwtToken = await AsyncStorage.getItem('cache');

    if (jwtToken) {
      const response = await axios.get(
        `${config.Base_url}/get-profil`,
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        }
      )
      if (response.data.ErrNum === 403) {
        await banned()
      }
      return response.data.Data[0];
    }
  } catch (error) {
    console.error('Error in getProfile:', error);
    throw error;
  }
}
