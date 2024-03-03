import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const deleteAlbum = async (data) => {
    console.log(data);

    // try {
    const jwtToken = await AsyncStorage.getItem('cache')
    console.log('====================================');
    console.log('prosess hapus album');
    console.log('====================================');
    const res = await axios.delete(
        `${config.Base_url}/album-hapus`,
        {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': `application/x-www-form-urlencoded`
            },
            data: data,
        }
    );
    console.log('====================================');
    console.log('res hapus album', res.data);
    console.log('====================================');

    // if (res.data.IsError == false) {
    console.log('data', res.data);

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
