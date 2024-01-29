import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserCari } from './getUserCari';

export const getKomentarApi = async (data) => {
  try {
    const jwtToken = await AsyncStorage.getItem('cache');
    let response = await axios.get(
        `https://picsea-1-k3867505.deta.app/komentar-cari?page=1&limit=${data.limit}&foto_id=${data.fotoId}`,
    );
    
    const komentar = response.data.Data

    let hasil
    if (response.data.ErrMsg == 404) {
        hasil = {
            count: 0,
        }
    } else {
        const promisesUser = komentar.map(async (komentar) => {
            const pengguna = await getUserCari({
                id: komentar.UserID,
            });
            const user = JSON.parse(JSON.stringify(pengguna));
            return { ...komentar, user }; // Menambahkan detail pengguna ke setiap komentar
        });
        const komentarDenganPengguna = await Promise.all(promisesUser);
        hasil = {
            count: response.data.total,
            komentar: komentarDenganPengguna
        }
    }
    return hasil
  } catch (error) {
    console.error('getKomentarApi' + error);
    throw error;
  }
}
