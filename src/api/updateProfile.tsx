import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../config';

export const updateProfile = async (data) => {
    //   try {
    console.log('====================================');
    console.log('proses edit profile');
    console.log('====================================');
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.patch(
        `${config.Base_url}/profil-edit`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${jwtToken}`,
            },
        }
    );


    return res.data
    //   } catch (error) {
    //     console.error('error Edit profile:' + error);
    //     if (error.response) {
    //         console.error('Error Edit profile Response Data:', error.response.data);
    //         console.error('Error Edit profile Response Status:', error.response.status);
    //       } else if (error.request) {
    //         console.error('Error Edit profile Request:', error.request);
    //       } else {
    //         console.error('Error Edit profile Message:', error.message);
    //       }
    //     throw error;
    //   }
}
