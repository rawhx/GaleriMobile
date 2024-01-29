import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const countPostingan = async () => {
  try {
    let total = 0
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.get(`https://picsea-1-k3867505.deta.app/foto-cari/profil?page=1&limit=1&membership=${false}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
    })
    const res2 = await axios.get(`https://picsea-1-k3867505.deta.app/foto-cari/profil?page=1&limit=1&membership=${true}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
    })

    if (res.data.ErrMsg != 404) {
      total += res.data.total 
    }
    if (res2.data.ErrMsg != 404) {
      total += res2.data.total 
    }
    
    return total
  } catch (error) {
    console.error('Error in countPostingan:', error);
    throw error;
  }
}