import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';

export const getUserCari = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache');
    var url = `${config.Base_url}/users-cari/guest?page=1&limit=1&user_id=${data.id}`
    if (jwtToken) {
      url = `${config.Base_url}/users-cari?page=1&limit=1&user_id=${data.id}`
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data.Data[0];
  } catch (error) {
    console.error('getUserCari : ' + error);
    throw error;
  }
}
