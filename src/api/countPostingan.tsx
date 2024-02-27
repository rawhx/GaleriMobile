import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const countPostingan = async () => {
  try {
    let total = 0
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.get(`${config.Base_url}/get-profil`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
    })

    const data = {
      countPostingan: res.data.Data[0].jmlhFoto || 0,
      countFollowers: res.data.Data[0].jmlhFollowers || 0,
      countMember: res.data.Data[0].jmlhMembership || 0,
    }
    return data
  } catch (error) {
    console.error('Error in countPostingan:', error);
    throw error;
  }
}