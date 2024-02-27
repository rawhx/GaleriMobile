import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const cariAlbum = async (data = { select: false }) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.get(
        `${config.Base_url}/album-cari?page=1&limit=10`, 
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
    );

    if (res.data.ErrMsg != 404) {
      if (data.select) {
        const formattedData = res.data.Data.map(item => ({
          label: item.NamaAlbum,
          value: item.id
        }));
        return formattedData    
      }
      return res.data.Data
    }
    return []
  } catch (error) {
    console.error('error cariAlbum:' + error);
    throw error;
  }
}
