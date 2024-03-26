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
        console.log('data komentar', response.data.Data);

        if (response.data.IsError) {
            hasil = {
                count: 0,
                komentar: null
            }
        } else {
            // const promisesUser = komentar.map(async (komentar) => {
            //     const pengguna = await getUserCari({
            //         id: komentar.UserID,
            //     });
            //     const user = JSON.parse(JSON.stringify(pengguna));
            //     return { ...komentar, user }; // Menambahkan detail pengguna ke setiap komentar
            // });
            // const komentarDenganPengguna = await Promise.all(promisesUser);
            hasil = {
                count: response.data.total,
                komentar: komentar
            }
        }
        console.log('komentar', hasil);
        return hasil

    } catch (error) {
        console.error('getKomentarApi' + error);
        throw error;
    }
}
