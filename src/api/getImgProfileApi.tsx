import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from './getProfileApi';

export const getImgAkun = async (member = false) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache');
    const res = await axios.get(`https://picsea-1-k3867505.deta.app/foto-cari/profil?page=1&limit=20&keduanya=false&membership=${member}`, {
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
