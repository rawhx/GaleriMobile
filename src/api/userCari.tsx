import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const userCari = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')

    let url = `${config.Base_url}/users-cari/guest?page=1&limit=10&user_id=${data.id}`

    if (jwtToken) { 
      url = `${config.Base_url}/users-cari?page=1&limit=10&user_id=${data.id}`
    }
    const res = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (res.data.ErrMsg != 404) {
      return res.data.Data[0]
    }
    
  } catch (error) {
    console.error('error userCari:' + error);
    throw error;
  }
}
