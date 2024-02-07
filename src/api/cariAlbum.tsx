import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const cariAlbum = async (data = { select: false }) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.get(
        `https://picsea-1-k3867505.deta.app/album-cari?page=1&limit=10`, 
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
