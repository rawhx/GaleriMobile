import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const getFotoProfile = async (member = false) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache')

    const res = await axios.get(
      `${config.Base_url}/foto-cari/profil?membership=${member}&page=1&limit=100`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    console.log(member);
    if (res.data.ErrNum !== 404) {
      return res.data.Data
    }

  } catch (error) {
    console.error('error fotoProfile:' + error);
    throw error;
  }
}
