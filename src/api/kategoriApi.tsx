import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const kategoriApi = async () => {
  try {
    const res = await axios.get(`https://picsea-1-k3867505.deta.app/kategori-cari?page=1&limit=10`)
    
    const formattedData = res.data.Data.map(item => ({
        label: item.Kategori,
        value: item.id
    }));
    return formattedData
  } catch (error) {
    console.error('Error in kategoriApi:', error);
    throw error;
  }
}