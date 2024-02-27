import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const getFollowApi = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.patch(`${config.Base_url}/follow?user_id=${data.userId}`, null, {
      headers: {
          'Authorization': `Bearer ${jwtToken}`,
      },
    });

    console.log('berhasil follow / unfollow');
    
    
    return res.data.Data
  } catch (error) {
    console.error('Error in follow:', error);
    throw error;
  }
}
