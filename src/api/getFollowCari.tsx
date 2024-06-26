import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const getFollowCariApi = async (data) => {
  console.log(data);
  
  try {
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.get(
        `${config.Base_url}/follow-cari?page=1&limit=10&user_id=${data.userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
    );
    console.log(res);
    
    return res.data.Data
  } catch (error) {
    console.error('getFollowCari' + error);
    throw error;
  }
}
