import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const addKomentar = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')
    
    const res = await axios.post(
        `${config.Base_url}/komentar-tambah`, 
        {
            foto_id: data.foto_id,
            komentar: data.komentar
        },
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    
    return res.data.Data
  } catch (error) {
    console.error('error addKomentar:' + error);
    if (error.response) {
      console.error('Error addKomentar Response Data:', error.response.data);
      console.error('Error addKomentar Response Status:', error.response.status);
    } else if (error.request) {
      console.error('Error addKomentar Request:', error.request);
    } else {
      console.error('Error addKomentar Message:', error.message);
    }
    throw error;
  }
}
