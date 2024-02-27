import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import config from "../../config"

export const historyTransaksiApi = async (page = 1, limit = 10) => {
    try {
        const jwtToken = await AsyncStorage.getItem('cache')
        const res = await axios.get(
            `${config.Base_url}/histori-transaksi/users?page=${page}&limit=${limit}`, 
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            }
        )

        console.log('====================================');
        console.log(res.data);
        console.log('====================================');

        if (!res.data.IsError) {
            return res.data.Data
        }
    } catch (error) {
        console.log('====================================');
        console.log('error history transaksi', error);
        console.log('====================================');
    }
}