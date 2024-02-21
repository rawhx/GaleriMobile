import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const addFoto = async (data) => {
  // try {
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.post(
        `https://picsea-1-k3867505.deta.app/foto-tambah`, 
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${jwtToken}`,
            },
        }
    );

    
    // if (res.data.IsError === false) {
    //   console.log('====================================');
    //   console.log('berhasil menambahkan foto');
    //   console.log('====================================');
      return res.data
    // } else {
    //   return 
    // }
    // return `Data gagal ${'\n'} disimpan`
  // } catch (error) {
  //   console.error('error addFoto:' + error);
  //   if (error.response) {
  //       console.error('Error addFoto Response Data:', error.response.data);
  //       console.error('Error addFoto Response Status:', error.response.status);
  //     } else if (error.request) {
  //       console.error('Error addFoto Request:', error.request);
  //     } else {
  //       console.error('Error addFoto Message:', error.message);
  //     }
  //   throw error;
  // }
}
