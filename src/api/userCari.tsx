import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const userCari = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')

    let url = `https://picsea-1-k3867505.deta.app/users-cari/guest?page=1&limit=10&user_id=${data.id}`

    if (jwtToken) { 
      url = `https://picsea-1-k3867505.deta.app/users-cari?page=1&limit=10&user_id=${data.id}`
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
