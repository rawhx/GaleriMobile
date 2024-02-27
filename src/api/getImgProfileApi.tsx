import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';

export const getImgAkun = async (member = false, id = '') => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache');
    let url = `${config.Base_url}/foto-cari/guest?page=1&limit=20&keduanya=false&membership=${member}${id !== '' ? `&user_id=${id}` : ''}`
    if (jwtToken) {
      url = `${config.Base_url}/foto-cari?page=1&limit=20&keduanya=false&membership=${member}${id !== '' ? `&user_id=${id}` : ''}`
    }
    const res = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
        },
    })
    return res.data.Data
  } catch (error) {
    console.error('Error in getImgAkun:', error);
    throw error;
  }
}
