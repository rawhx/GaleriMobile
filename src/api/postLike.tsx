import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const postLike = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')

    const res = await axios.post(
        `${config.Base_url}/like-foto`, 
        {
            foto_id: data.foto_id,
        },
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    
    return res.data
  } catch (error) {
    console.error('error like:' + error);
    throw error;
  }
}
