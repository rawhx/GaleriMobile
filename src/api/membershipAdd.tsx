import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const membershipAdd = async (data) => {
//   try {
  const jwtToken = await AsyncStorage.getItem('cache')
  console.log('====================================');
  console.log('data membershipAdd', data);
  console.log('====================================');
  const res = await axios.post(
      `https://picsea-1-k3867505.deta.app/membership-tambah`, data,
      {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type' : `application/x-www-form-urlencoded`
        },
      }
  );
  
  return res.data
//   } catch (error) {
//     console.error('reportFoto' + error);
//     throw error;
//   }
}
