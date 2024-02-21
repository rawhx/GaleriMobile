import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getImgAkun = async (member = false, id = '') => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache');
    let url = `https://picsea-1-k3867505.deta.app/foto-cari/guest?page=1&limit=20&keduanya=false&membership=${member}${id !== '' ? `&user_id=${id}` : ''}`
    if (jwtToken) {
      url = `https://picsea-1-k3867505.deta.app/foto-cari?page=1&limit=20&keduanya=false&membership=${member}${id !== '' ? `&user_id=${id}` : ''}`
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
