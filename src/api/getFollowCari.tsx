import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getFollowCariApi = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.get(
        `https://picsea-1-k3867505.deta.app/follow-cari?page=1&limit=10&user_id=${data.userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
    );
    
    return res.data.Data
  } catch (error) {
    console.error('getFollowCari' + error);
    throw error;
  }
}
