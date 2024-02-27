import axios from 'axios';
import config from '../../config';

export const kategoriApi = async () => {
  try {
    const res = await axios.get(`${config.Base_url}/kategori-cari?page=1&limit=10`)
    
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