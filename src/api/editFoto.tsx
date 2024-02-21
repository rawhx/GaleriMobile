import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const EditFoto = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')
    console.log('====================================');
    console.log('prosess Edit Foto');
    console.log('====================================');
    const res = await axios.patch(
        `https://picsea-1-k3867505.deta.app/foto-edit`, 
        data,
        {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${jwtToken}`,
            },
        }
    );

    console.log('====================================');
    console.log('berhasil edit foto');
    console.log('====================================');

    if (res.data.IsError == false) {
      return res.data
    } 
  } catch (error) {
    console.error('error Edit Foto:' + error);
    if (error.response) {
        console.error('Error Edit Foto Response Data:', error.response.data);
        console.error('Error Edit Foto Response Status:', error.response.status);
      } else if (error.request) {
        console.error('Error Edit Foto Request:', error.request);
      } else {
        console.error('Error Edit Foto Message:', error.message);
      }
    throw error;
  }
}
