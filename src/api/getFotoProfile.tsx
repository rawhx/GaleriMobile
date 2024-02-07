import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getFotoProfile = async (member = false) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')

    const res = await axios.get(
      `https://picsea-1-k3867505.deta.app/foto-cari/profil?page=1&limit=100&membership=${member}`, 
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (res.data.ErrMsg != 404) {
      return res.data.Data
    }
    
  } catch (error) {
    console.error('error fotoProfile:' + error);
    throw error;
  }
}
