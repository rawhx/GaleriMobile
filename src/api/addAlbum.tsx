import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const addAlbum = async (data) => {
  // try {
    console.log(data);
    
    const jwtToken = await AsyncStorage.getItem('cache')
    console.log(jwtToken);
    
    const res = await axios.post(
      `${config.Base_url}/album-tambah`, 
      data,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
    console.log(res.data);
    
    return res.data
  // } catch (error) {
  //   console.error('error addAlbum:' + error);
  //   if (error.response) {
  //       console.error('Error addAlbum Response Data:', error.response.data);
  //       console.error('Error addAlbum Response Status:', error.response.status);
  //     } else if (error.request) {
  //       console.error('Error addAlbum Request:', error.request);
  //     } else {
  //       console.error('Error addAlbum Message:', error.message);
  //     }
  //   throw error;
  // }
}
