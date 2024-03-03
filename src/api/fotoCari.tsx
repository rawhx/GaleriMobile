import axios from "axios";
import config from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fotoCari = async (data) => {
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.get(
        `${config.Base_url}/foto-cari?foto_id=${data.foto_id}&membership=true&keduanya=true&page=1&limit=10`,
        {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        }
    );

    return res.data.Data
}