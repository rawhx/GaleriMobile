import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const addKomentar = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')
    
    console.log('====================================');
    console.log(data);

    const res = await axios.post(
        `https://picsea-1-k3867505.deta.app/komentar-tambah`, 
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

    console.log('====================================');
    console.log(res.data);
    console.log('====================================');
    return res.data
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
