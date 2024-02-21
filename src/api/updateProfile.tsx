import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const updateProfile = async (data) => {
//   try {
    console.log('====================================');
    console.log('proses edit profile');
    console.log('====================================');
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.patch(
        `https://picsea-1-k3867505.deta.app/profil-edit`, 
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${jwtToken}`,
            },
        }
    );

    console.log('====================================');
    console.log('berhasil edit profile');
    console.log('====================================');

    if (res.data.IsError == false) {
        return res.data
    } else {
        return false
    }
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
