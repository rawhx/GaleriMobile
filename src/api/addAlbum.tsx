import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const addAlbum = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')
    
    const res = await axios.post(
      `https://picsea-1-k3867505.deta.app/album-tambah?nama_album=${data.nama_album}&deskripsi_album=${data.deskripsi_album}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    console.log('success');
    
    
    return res.data.Data
  } catch (error) {
    console.error('error addAlbum:' + error);
    if (error.response) {
        console.error('Error addAlbum Response Data:', error.response.data);
        console.error('Error addAlbum Response Status:', error.response.status);
      } else if (error.request) {
        console.error('Error addAlbum Request:', error.request);
      } else {
        console.error('Error addAlbum Message:', error.message);
      }
    throw error;
  }
}
