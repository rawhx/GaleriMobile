import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const deleteFoto = async (id) => {
    console.log(id);
    
  // try {
    const jwtToken = await AsyncStorage.getItem('cache')
    console.log('====================================');
    console.log('prosess hapus Foto');
    console.log('====================================');
    const res = await axios.delete(
        `${config.Base_url}/foto-hapus`, 
        {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type' : `application/x-www-form-urlencoded`
            },
            data: {
                foto_id: id
            }
        }
    );
    
    console.log('====================================');
    console.log('berhasil hapus foto');
    console.log('====================================');

    // if (res.data.IsError == false) {
      return res.data
    // } 
  // } catch (error) {
  //   console.error('error hapus Foto:' + error);
  //   if (error.response) {
  //       console.error('Error hapus Foto Response Data:', error.response.data);
  //       console.error('Error hapus Foto Response Status:', error.response.status);
  //     } else if (error.request) {
  //       console.error('Error hapus Foto Request:', error.request);
  //     } else {
  //       console.error('Error hapus Foto Message:', error.message);
  //     }
  //   throw error;
  // }
}
