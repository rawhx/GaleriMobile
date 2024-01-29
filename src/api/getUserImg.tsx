import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserImg = async ({data}) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache');
    var url = `https://picsea-1-k3867505.deta.app/foto-cari/guest?page=1&limit=1&foto_id=${data.id}`
   if (jwtToken) {
    
   }
    const response = await axios.get(url);
    return response.data.Data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
