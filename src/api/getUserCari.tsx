import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserCari = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache');
    var url = `https://picsea-1-k3867505.deta.app/users-cari?page=1&limit=1&user_id=${data.id}`

    const response = await axios.get(url);
    return response.data.Data[0];
  } catch (error) {
    console.error('getUserCari : ' + error);
    throw error;
  }
}
