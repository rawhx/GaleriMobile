import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getProfile = async () => {
  try {
    // Get the JWT token from AsyncStorage
    const jwtToken = await AsyncStorage.getItem('cache');

    if (jwtToken) {
      const response = await axios.get(
        'https://picsea-1-k3867505.deta.app/get-profil',
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        }
      );
  
      return response.data.Data[0];
    }
  } catch (error) {
    console.error('Error in getProfile:', error);
    throw error;
  }
}
