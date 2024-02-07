import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const postLike = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')

    const res = await axios.post(
        `https://picsea-1-k3867505.deta.app/like-foto`, 
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
    console.error('error addKomentar:' + error);
    throw error;
  }
}
